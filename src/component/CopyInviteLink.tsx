import { useState } from "react";

export default function CopyInviteLink({ roomId }: { roomId: string }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const origin = window.location.origin;

  const copyToClipboard = () => {
    console.log("copied");

    const link = `${origin}/join/${roomId}`;
    navigator.clipboard.writeText(link);
    setCopySuccess(true);
  };

  return (
    <div
      onClick={copyToClipboard}
      className="text-slate-50 text-xl px-6 py-2 border rounded-md cursor-copy"
    >
      {copySuccess ? "Copied!" : "Copy invite link"}
    </div>
  );
}
