import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { JoinRoomAsGuest } from "../helperFunctions/joinRoomAsGuest";
import { auth } from "../firebase/firebaseConfig";
import Loader from "../component/Loader";

const key = "user_Name_tictac";

export default function JoinRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const currUserId = auth.currentUser?.uid;
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const _userName = localStorage.getItem(key);
    if (_userName) {
      setUserName(_userName);
    }
  }, []);

  async function handleJoinRoom() {
    setLoading(true);
    if (userName && currUserId && roomId) {
      try {
        const res = await JoinRoomAsGuest(currUserId, roomId, userName);

        if (res === "success") {
          navigate(`/room/${roomId}`);
          return;
        }
      } catch (e: any) {
        setLoading(false);
        setErr(e.message);
        console.log(e);
      }
    }
    setLoading(false);
  }

  function handleSetUserName(text: string) {
    localStorage.setItem(key, text);
    setUserName(text);
  }

  if (loading) {
    return <Loader text="Joining..." />;
  }
  if (!roomId || !!err) {
    return <Loader text={err ? err : "Invalid room!"} error />;
  }
  return (
    <div className="flex flex-col gap-2  items-center h-[100vh] justify-center">
      <div className="flex gap-2 items-center w-[400px]">
        <input
          value={userName}
          onChange={(e) => handleSetUserName(e.target.value)}
          className="rounded-sm h-full flex-1 px-2"
          placeholder="Enter your name"
        />
        <button
          className={`border rounded-lg p-2 px-7 w-fit bg-slate-200 ${
            !userName ? "bg-gray-400 text-gray-500 cursor-not-allowed" : ""
          }`}
          onClick={() => handleJoinRoom()}
        >
          Join room
        </button>
      </div>
    </div>
  );
}
