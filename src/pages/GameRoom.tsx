import { useParams } from "react-router-dom";

import { useEffect, useMemo, useState } from "react";
import { getRoomReference } from "../helperFunctions/getRoomDetails";
import { MatchModel } from "../types/Database.model";
import { auth } from "../firebase/firebaseConfig";
import GameBoard from "../component/GameBoard";
import StartNewGameButton from "../component/StartNewGameButton";
import UserScoreWindow from "../component/UserScoreWindow";
import Loader from "../component/Loader";
import CopyInviteLink from "../component/CopyInviteLink";
import ButtonHomePage from "../component/ButtonHomePage";

export default function GameRoom() {
  const { roomId } = useParams();
  const currentUserId = auth.currentUser?.uid;
  const [isCurrUserAuthor, setIsCurrUserAuthor] = useState(false);
  const [roomData, setRoomData] = useState<MatchModel | null>(null);
  const [isCurrUserActive, setCurrUserActive] = useState(false);
  const otherUserOnlineStatus = useMemo(() => {
    if (roomData?.playersOnline && currentUserId) {
      const onlineUsers = roomData.playersOnline;
      delete onlineUsers[currentUserId];
      return !!Object.values(onlineUsers)[0];
    }
    return true;
  }, [roomData?.playersOnline]);
  const winnerName = useMemo(() => {
    if (roomData?.winner) {
      const winnerId = roomData.winner;
      const authorId = roomData.author;
      if (winnerId === authorId) {
        return roomData.userA || "Host";
      }
      return roomData.userB || "Guest";
    }
  }, [roomData?.winner]);
  const wonGrids = useMemo(() => {
    return roomData?.gridWinner || {};
  }, [roomData?.gridWinner]);

  const matchFinished = useMemo(() => {
    return !!(roomData?.state === "finished");
  }, [roomData?.state]);

  const isGuestJoined = useMemo(() => {
    return !!roomData?.guest;
  }, [roomData?.guest]);

  const disabledGridNumbers = useMemo(() => {
    const wonGridNumbers = Object.keys(roomData?.gridWinner || {});
    const isActiveGridAlreadyWon = wonGridNumbers.includes(
      `${roomData?.currentGridNumber}`
    );
    if (!roomData) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    let disabledGridNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (roomData.currentGridNumber) {
      disabledGridNumbers.splice(roomData?.currentGridNumber - 1, 1);
    }
    if (roomData?.currentGridNumber === 0) {
      disabledGridNumbers = [];
    }
    if (isActiveGridAlreadyWon) {
      disabledGridNumbers = wonGridNumbers.map((gridNum) => +gridNum);
    }
    return disabledGridNumbers;
  }, [roomData?.currentGridNumber]);

  useEffect(() => {
    const ref = getRoomReference(roomId!);
    if (roomId) {
      ref.on("value", (data) => {
        const roomDetails = data.val() as MatchModel;
        setRoomData(roomDetails);
        setIsCurrUserAuthor(roomDetails.author === currentUserId);
        if (currentUserId && roomDetails.playersOnline) {
          const currUserOnlineStatus = roomDetails.playersOnline[currentUserId];
          if (currUserOnlineStatus === false) {
            setCurrUserActive(true);
          }
        }
      });
      ref.onDisconnect().update({
        [`playersOnline/${currentUserId}`]: false,
      });
    }
    return () => {
      ref.update({
        [`playersOnline/${currentUserId}`]: false,
      });
      return ref.off("value");
    };
  }, [roomId]);

  // when user close the window
  window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    const ref = getRoomReference(roomId!);

    ref.update({
      [`playersOnline/${currentUserId}`]: false,
    });
  });

  useEffect(() => {
    if (isCurrUserActive) {
      const ref = getRoomReference(roomId!);
      ref.update({
        [`playersOnline/${currentUserId}`]: true, // set online if offline
      });
    }
  }, [isCurrUserActive]);

  // async function handleStartGame() {
  //   if (roomData?.state !== "playing") {
  //     const matchDetails = roomData as Empty_ROOM_Model;
  //     await startNewGame(matchDetails);
  //   }
  // }

  if (roomData === null) {
    return <Loader text="Loading..." />;
  }

  if (
    !(roomData.author === currentUserId || roomData.guest === currentUserId)
  ) {
    return <Loader error text="Unauthorized to join the room!" />;
  }

  if (!isGuestJoined) {
    return (
      <>
        <div className="absolute top-2 left-2 z-10">
          <CopyInviteLink roomId={roomData.roomId} />
        </div>
        <Loader text="Waiting for guest..." />
      </>
    );
  }

  return (
    <div className="flex items-center justify-center w-[100vw] h-auto">
      <div className="absolute top-0 left-0">
        {/* first user */}
        <UserScoreWindow
          isOnline={true} //for current user
          isCurrUserAuthorCondition={isCurrUserAuthor}
          currUserName={
            (isCurrUserAuthor ? roomData.userA : roomData.userB) || ""
          }
          gridWinner={wonGrids}
        />
      </div>
      <div className="absolute top-0 right-0">
        {/* Second user */}
        <UserScoreWindow
          isOnline={otherUserOnlineStatus}
          isCurrUserAuthorCondition={!isCurrUserAuthor}
          currUserName={
            (!isCurrUserAuthor ? roomData.userA : roomData.userB) || ""
          }
          gridWinner={wonGrids}
        />
      </div>
      {roomData.game && !matchFinished ? (
        <GameBoard
          roomId={roomData.roomId}
          currentAuthorState={isCurrUserAuthor ? "I" : "II"}
          game={roomData.game}
          currentAuthorTurn={currentUserId === roomData?.currentTurn || false}
          disabledGrids={disabledGridNumbers}
        />
      ) : (
        <>
          <div className="absolute top-[50%] flex flex-col gap-2">
            <span className="text-slate-50 text-2xl font-bold mb-4 border-b p-2 px-8">
              {winnerName ? `${winnerName.toUpperCase()} WON` : "Match draw"}
            </span>
            <ButtonHomePage />
            {roomId && (
              <StartNewGameButton
                text="Start game"
                authorId={roomData.author}
                guestId={roomData.guest}
                roomId={roomId}
                gameStatus={roomData.state}
              />
            )}
          </div>
        </>
      )}
      <div className="absolute bottom-3 left-2 flex flex-col">
        <ButtonHomePage text="Exit" />
        {roomId && (
          <StartNewGameButton
            text="Start new"
            authorId={roomData.author}
            guestId={roomData.guest}
            roomId={roomId}
            gameStatus={roomData.state}
          />
        )}
      </div>
    </div>
  );
}
