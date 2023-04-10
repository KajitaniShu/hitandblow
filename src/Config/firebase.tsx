// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBptRJsLIq4Nz-210u6nGNNrdhZw10WTZU",
  authDomain: "hitandblow-ab513.firebaseapp.com",
  projectId: "hitandblow-ab513",
  storageBucket: "hitandblow-ab513.appspot.com",
  messagingSenderId: "765776984042",
  appId: "1:765776984042:web:b51df4e0f8e06c3bd0a493",
  measurementId: "G-48ZKH5TES0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export {db, storage, provider, auth};