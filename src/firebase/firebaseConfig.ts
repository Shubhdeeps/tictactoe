import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/storage";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB2mQ6u_IHrb-A-iyQw6TX5J1DoEW_23sQ",
  authDomain: "tictactoe-14385.firebaseapp.com",
  projectId: "tictactoe-14385",
  storageBucket: "tictactoe-14385.appspot.com",
  messagingSenderId: "427739900086",
  appId: "1:427739900086:web:6c942d0b23c4efcc8a9e17",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
// export const firestore = firebaseApp.firestore();
// export const storage = firebaseApp.storage();
export const database = firebaseApp.database(
  "https://tictactoe-14385-default-rtdb.firebaseio.com"
);
// export const provider = new firebase.auth.GoogleAuthProvider();
// export const FieldValue = firebase.firestore.FieldValue;
// export const Timestamp = firebase.firestore.Timestamp;
