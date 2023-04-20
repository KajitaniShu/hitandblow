// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {collection, doc, addDoc, query, setDoc, where, Timestamp } from 'firebase/firestore';

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

async function addUser(name: any, language: any, uuid: any) {
  const update = Timestamp.now();

  const docRef = await setDoc(doc(db, "user-data", uuid), {
    uuid: uuid,
    name: name,
    money: 0,
    win: 0,
    lose: 0,
    level: 1.0,
    language: language,
    friends: {},
    history: {},
    update: update
  });
}

async function setUser(
    uuid:   string,
    name:   string,
    money:  number,
    win:    number,
    lose:   number,
    level:  number,
    language: string,
    friends: string[],
    history: string[]) {
  const update = Timestamp.now();
  const docRef = await setDoc(doc(db, "user-data", uuid), {
    uuid: uuid,
    name: name,
    money: 0,
    win: 0,
    lose: 0,
    level: 1.0,
    language: language,
    friends: friends,
    history: history,
    update: update
  });
}

async function addRoom(
  uuid:   string,
  number:   number,
  timeLimits: number,
  effects: boolean,
  name:string, 
  level:number, 
  win:number, 
  lose:number,
  character: string
  ) {
  const update = Timestamp.now();
  const docRef = await addDoc(collection(db, "room-data"), {
    host: {name: name, uuid: uuid, number: number, level: level, win: win, lose: lose, character: character},
    guest: null,
    turn: -1,
    useEffects: effects,
    timeLimits: timeLimits,
    update: update
  });
  return docRef.id;
}

async function setPredict(
  predict: any, 
  effectId: any, 
  playerUuid: any,
  roomId: any
  ) {
  const update = Timestamp.now();
  const docRef = await addDoc(collection(db, "room-data/" + roomId + "/game-data"), {
    predict:  predict,
    hit:      0,
    blow:     0,
    playerUuid: playerUuid,
    update:  update,
    effectId: effectId,
    type: 'predict',
  });
  return docRef.id;
}

export {db, storage, provider, auth, addUser, setUser, addRoom, setPredict};