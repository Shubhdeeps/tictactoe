import { database } from "../firebase/firebaseConfig";
import { Empty_ROOM_Model, MatchModel } from "../types/Database.model";

const EmptyGrid = {
  1: "none",
  2: "none",
  3: "none",
  4: "none",
  5: "none",
  6: "none",
  7: "none",
  8: "none",
  9: "none",
} as const;

const dbRef = database.ref("/rooms");

export async function startNewGame(matchDetails: Empty_ROOM_Model) {
  const { author, guest, roomId } = matchDetails;
  if (guest) {
    const newMatch: MatchModel = {
      ...matchDetails,
      currentGridNumber: 0,
      currentTurn: author,
      lastPlayed: 0,
      guest,
      playersOnline: {
        [author]: true,
        [guest]: true,
      },
      state: "playing",
      winners: {},
      gridWinner: {},
      game: {
        1: EmptyGrid,
        2: EmptyGrid,
        3: EmptyGrid,
        4: EmptyGrid,
        5: EmptyGrid,
        6: EmptyGrid,
        7: EmptyGrid,
        8: EmptyGrid,
        9: EmptyGrid,
      },
    };

    await dbRef.child(roomId).update(newMatch);
    return "success";
  }
}
