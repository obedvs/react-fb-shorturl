import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBZ9DJdSwd1nJZPd1_6Pa2PuSQaIGV5Oyc",
  authDomain: "react-fb-afe69.firebaseapp.com",
  projectId: "react-fb-afe69",
  storageBucket: "react-fb-afe69.appspot.com",
  messagingSenderId: "1070780739729",
  appId: "1:1070780739729:web:cfc3c09c8e0be75254cf30"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };