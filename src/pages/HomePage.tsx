import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAndJoinRoom } from "../helperFunctions/createNewRoom";
import { auth } from "../firebase/firebaseConfig";

const key = "user_Name_tictac";
export default function HomePage() {
  const navigate = useNavigate();
  const currUserId = auth.currentUser?.uid;
  const [enterRoomId, setEnterRoomId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const _userName = localStorage.getItem(key);
    if (_userName) {
      setUserName(_userName);
    }
  }, []);
  function handleJoinRoom() {
    if (enterRoomId) {
      navigate(`/join/${enterRoomId}`);
    }
  }
  async function handleCreateRoom() {
    if (currUserId && !!userName) {
      try {
        const newRoom = await createAndJoinRoom(currUserId, userName);
        const roomID = newRoom.roomId;
        navigate(`/room/${roomID}`);
      } catch (e) {
        console.log(e);
      }
    }
  }

  function handleSetUserName(text: string) {
    localStorage.setItem(key, text);
    setUserName(text);
  }

  return (
    <div className="flex flex-col gap-2  items-center h-[100vh] justify-center">
      <span className="border rounded-lg p-2 mb-5 w-fit text-slate-200">
        Welcome to tic tac toe advanced
      </span>
      <div className="flex gap-2 items-center w-[400px]">
        <input
          onChange={(e) => setEnterRoomId(e.target.value)}
          className="rounded-sm h-full flex-1 px-2"
          placeholder="room id"
        />
        <button
          onClick={() => handleJoinRoom()}
          className="border rounded-lg p-2 px-4 w-fit bg-slate-200"
        >
          Join a room
        </button>
      </div>
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
          onClick={() => handleCreateRoom()}
        >
          Create a room
        </button>
      </div>
    </div>
  );
}
