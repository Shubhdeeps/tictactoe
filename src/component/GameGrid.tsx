import { AuthorState, CellState } from "../types/CellState";
import GameGridWrapper from "./GameGridWrapper";
import GameCell from "./GameCell";

type Props = {
  cellStates: CellState[];
  currentAuthorTurn: boolean;
  currentAuthorState: AuthorState;
  disableGrid: boolean;
  handlePlayMove: (cellNumber: number) => void;
};

export default function GameGrid({
  cellStates,
  currentAuthorTurn,
  currentAuthorState,
  disableGrid,
  handlePlayMove,
}: Props) {
  return (
    <>
      {
        <GameGridWrapper
          disable={disableGrid}
          bg="bg-black"
          componentsArray={cellStates.map((state, index) => {
            const cellNumber = index + 1;
            return (
              <GameCell
                handleCellClick={() => handlePlayMove(cellNumber)}
                currentAuthorTurn={currentAuthorTurn && !disableGrid}
                initState={state}
                authorState={currentAuthorState}
              />
            );
          })}
        />
      }
    </>
  );
}
