import { useEffect, useMemo, useState } from "react";
import { AuthorState, CellState } from "../types/CellState";
import GameCellWrapper from "./GameCellWrapper";
import { circleSVG } from "../assets/circle";
import { crossSVG } from "../assets/cross";

const cellStateAndCss: Record<CellState, string> = {
  none: "bg-gray-800",
  I: "bg-[#14B0BF]",
  II: "bg-[#F5C002]",
} as const;
const cellStateAndContent = {
  none: "",
  I: circleSVG,
  II: crossSVG,
};

export default function GameCell({
  initState,
  authorState,
  currentAuthorTurn,
  handleCellClick,
}: {
  initState?: CellState;
  authorState: AuthorState;
  currentAuthorTurn: boolean;
  handleCellClick: () => void;
}) {
  const [cellState, setCellState] = useState(initState || "none");
  const isCurrUserAuthor = authorState === "I";
  useEffect(() => {
    setCellState(initState || "none");
  }, [initState]);
  const BG_CSS_CLASS = useMemo(() => {
    return cellStateAndCss[cellState];
  }, [cellState]);

  const CELL_CONTENT = useMemo(() => {
    return cellStateAndContent[cellState];
  }, [cellState]);

  const PULSE =
    !!currentAuthorTurn && cellState === "none" ? "animate-pulse" : "";
  async function handleClick() {
    if (cellState === "none" && currentAuthorTurn) {
      setCellState(authorState);
      handleCellClick();
      return;
    }

    // notification that already played
  }
  return (
    <>
      <GameCellWrapper
        isCurrUserAuthor={isCurrUserAuthor}
        currentAuthorTurn={currentAuthorTurn}
        isCompleted={cellState !== "none"}
      >
        <div
          onClick={handleClick}
          className={`${PULSE} text-cyan-50 flex items-center justify-center text-3xl font-bold border w-[100px] h-[100px] ${BG_CSS_CLASS}`}
        >
          {CELL_CONTENT}
        </div>
      </GameCellWrapper>
    </>
  );
}
