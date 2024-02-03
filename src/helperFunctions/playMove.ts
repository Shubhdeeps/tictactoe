import { auth, database } from "../firebase/firebaseConfig";
import { AuthorState } from "../types/CellState";
import { MatchModel, SingleGameGridState } from "../types/Database.model";

const dbRef = database.ref("/rooms");
export async function playMove(
  gridNumber: number,
  cellNumber: number,
  roomId: string
) {
  const currentUserId = auth.currentUser?.uid;
  const match = await dbRef.child(roomId).get();
  const matchData = match.val() as MatchModel;
  const isCurrentUserTurn = matchData.currentTurn === currentUserId;
  if (!isCurrentUserTurn) {
    return "Not your turn";
  }
  const recentPlayedGrid = matchData.game![gridNumber];
  const authorId = matchData.author;
  const guestId = matchData.guest;
  const isCurrentUserAuthor = matchData.author === currentUserId;
  const currentUserCellState: AuthorState = isCurrentUserAuthor ? "I" : "II";
  const otherPlayerId = isCurrentUserAuthor ? guestId : authorId;

  //update the cell number with current entry
  recentPlayedGrid[cellNumber] = currentUserCellState;
  const gridWon = checkGridWinner(recentPlayedGrid);
  const timeNow = Date.now();

  const objectToUpdate = {
    currentTurn: otherPlayerId,
    currentGridNumber: cellNumber,
    lastPlayed: timeNow,
    [`game/${gridNumber}/${cellNumber}`]: currentUserCellState,
  };

  if (gridWon) {
    const nullGrid: SingleGameGridState = {
      1: "none",
      2: "none",
      3: "none",
      4: "none",
      5: "none",
      6: "none",
      7: "none",
      8: "none",
      9: "none",
    };
    const _gridWinner = (matchData.gridWinner || {}) as SingleGameGridState;
    // if grid won, the winner will have the same authorState
    _gridWinner[gridNumber] = currentUserCellState;

    // remove nones from null grid with winnner grid
    Object.assign(nullGrid, _gridWinner);
    //check if anyone won the whole match
    const matchWon = checkGridWinner(nullGrid);

    if (matchWon) {
      Object.assign(objectToUpdate, {
        winner: currentUserId,
        state: "finished",
      });
    }
    Object.assign(objectToUpdate, {
      [`gridWinner/${gridNumber}`]: currentUserCellState,
    });
  }
  await dbRef.child(roomId).update(objectToUpdate);
  return;
}

function checkGridWinner(gameState: SingleGameGridState) {
  const values = Object.values(gameState);
  const row1 =
    values[0] === values[1] && values[1] === values[2] && values[0] !== "none";
  const row2 =
    values[3] === values[4] && values[3] === values[5] && values[3] !== "none";
  const row3 =
    values[6] === values[7] && values[6] === values[8] && values[6] !== "none";
  const column1 =
    values[0] === values[3] && values[0] === values[6] && values[0] !== "none";
  const column2 =
    values[1] === values[4] && values[1] === values[7] && values[1] !== "none";
  const column3 =
    values[2] === values[5] && values[2] === values[8] && values[2] !== "none";
  const diag1 =
    values[0] === values[4] && values[0] === values[8] && values[0] !== "none";
  const diag2 =
    values[2] === values[4] && values[2] === values[6] && values[2] !== "none";

  if (row1 || row2 || row3 || column1 || column2 || column3 || diag1 || diag2) {
    return true;
  }
  return false;
}
