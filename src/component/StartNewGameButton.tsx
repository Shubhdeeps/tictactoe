import { startNewGame } from "../helperFunctions/startNewGame";

export default function StartNewGameButton({
  roomId,
  gameStatus,
  authorId,
  guestId,
  text,
}: {
  roomId: string;
  gameStatus: "playing" | "waiting" | "finished";
  authorId: string;
  guestId: string;
  text: string;
}) {
  async function handleStartNewGame() {
    console.log("starting");

    const res = await startNewGame({
      author: authorId,
      memberJoined: 2,
      roomId,
      state: gameStatus,
      guest: guestId,
    });
    console.log(res);
  }
  return (
    <button
      onClick={() => handleStartNewGame()}
      className="text-slate-50 font-bold mt-4 border rounded p-2 px-8"
    >
      {text}
    </button>
  );
}
