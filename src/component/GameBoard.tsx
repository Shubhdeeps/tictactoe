import GameGridWrapper from "./GameGridWrapper";
import GameGrid from "./GameGrid";
import { Game, SingleGameGridState } from "../types/Database.model";
import { AuthorState, CellState } from "../types/CellState";
import { memo } from "react";
import { playMove } from "../helperFunctions/playMove";
type Props = {
  game: Game;
  currentAuthorTurn: boolean;
  disabledGrids: number[];
  currentAuthorState: AuthorState;
  roomId: string;
};
const PARENT_GRID_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function GameBoard({
  game,
  currentAuthorTurn,
  disabledGrids,
  currentAuthorState,
  roomId,
}: Props) {
  function singleGameGridObjectToArray(
    singleGridState: SingleGameGridState
  ): CellState[] {
    const array: CellState[] = [];
    const gridNumberArray = Object.keys(singleGridState).sort();
    for (const state of gridNumberArray) {
      array.push(singleGridState[+state]);
    }
    return array;
  }

  async function handlePlayMove(gridNumber: number, cellNumber: number) {
    await playMove(gridNumber, cellNumber, roomId);
  }

  return (
    <div className="bg-gray-800 p-2">
      <GameGridWrapper
        bg="bg-gray-800 gap-2"
        componentsArray={PARENT_GRID_NUMBERS.map((gridNumber) => {
          return (
            <GameGrid
              handlePlayMove={(cellNumber) =>
                handlePlayMove(gridNumber, cellNumber)
              }
              disableGrid={disabledGrids.includes(gridNumber)}
              currentAuthorState={currentAuthorState}
              key={gridNumber}
              cellStates={singleGameGridObjectToArray(game[gridNumber])}
              currentAuthorTurn={currentAuthorTurn}
            />
          );
        })}
      />
    </div>
  );
}

export default memo(GameBoard);
