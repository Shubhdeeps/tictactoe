import React from "react";
import circleCursor from "../assets/circleCursor.svg";
import crossCursor from "../assets/crossCursor.svg";

const CSS_CLASS_MAP: Record<string, string> = {
  true: "cursor-not-allowed",
  false: "",
};
export default function GameCellWrapper({
  children,
  isCompleted,
  currentAuthorTurn,
  isCurrUserAuthor,
}: {
  children: React.ReactNode;
  isCompleted: boolean;
  currentAuthorTurn: boolean;
  isCurrUserAuthor: boolean;
}) {
  const cursor = isCurrUserAuthor ? circleCursor : crossCursor;
  const cursorSVG = currentAuthorTurn ? cursor : null;
  const customCursorStyle = cursorSVG
    ? {
        cursor: `url(${cursorSVG}), auto`,
      }
    : {};

  const CSS_CLASS = CSS_CLASS_MAP[String(isCompleted || !currentAuthorTurn)];
  return (
    <div style={customCursorStyle} className={`${CSS_CLASS}`}>
      {children}
    </div>
  );
}
