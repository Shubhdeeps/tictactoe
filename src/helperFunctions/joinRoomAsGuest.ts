import { database } from "../firebase/firebaseConfig";
const dbRef = database.ref("/rooms");
export async function JoinRoomAsGuest(
  currentUserId: string,
  roomId: string,
  userName: string
) {
  const lookForRoom = await dbRef.child(roomId).get();
  if (!lookForRoom.exists()) {
    throw Error("Room does not exist!");
  }
  const roomData = lookForRoom.val();
  const roomValue = roomData.memberJoined;
  //if already joined -> returning user
  if (roomData.author === currentUserId || roomData.guest === currentUserId) {
    return "success";
  }

  if (roomValue > 1) {
    throw Error("Room full!");
  }
  await dbRef.child(roomId).update({
    guest: currentUserId,
    memberJoined: roomValue + 1,
    userB: userName,
  });
  return "success";
}
