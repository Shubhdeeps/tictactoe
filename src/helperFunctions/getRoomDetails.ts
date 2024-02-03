import { database } from "../firebase/firebaseConfig";

const dbRef = database.ref("/rooms");

export function getRoomReference(roomId: string) {
  return dbRef.child(roomId);
}
