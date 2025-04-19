// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Make sure this is imported

const firebaseConfig = {
  apiKey: "AIzaSyAz8beNrkSHrIXZRjHpAWjDRa0hMJMk2F4",
  authDomain: "mern-ui.firebaseapp.com",
  projectId: "mern-ui",
  storageBucket: "mern-ui.appspot.com",
  messagingSenderId: "388740603116",
  appId: "1:388740603116:web:1a36eb1f779dec823299c9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Define db before exporting

export { auth, db }; // ✅ Export db
