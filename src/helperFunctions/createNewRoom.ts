import { database } from "../firebase/firebaseConfig";
import { Empty_ROOM_Model } from "../types/Database.model";
import { v4 as uuidv4 } from "uuid";

const dbRef = database.ref("/rooms");
export async function createAndJoinRoom(
  currentUserId: string,
  userName: string
) {
  const matchId = uuidv4();
  const emptyRoom: Empty_ROOM_Model = {
    roomId: matchId,
    author: currentUserId,
    state: "waiting",
    memberJoined: 1,
    userA: userName,
  };
  await dbRef.child(matchId).set(emptyRoom);
  return emptyRoom;
}
