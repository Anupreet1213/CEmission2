import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

//To initialize firebase in react app
const app = firebase.initializeApp({
  apiKey: "AIzaSyDM1NONfiihHCLFK3v7wrzyB1ZciMcWDvI",
  authDomain: "cemission-cf044.firebaseapp.com",
  projectId: "cemission-cf044",
  storageBucket: "cemission-cf044.appspot.com",
  messagingSenderId: "286594986910",
  appId: "1:286594986910:web:a11a4889b6b902246f9c8f",
  measurementId: "G-L3ME228EHZ",
});

const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default auth;
