// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, signInAnonymously, getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { collection, doc, addDoc, query, setDoc, updateDoc, Timestamp } from 'firebase/firestore';

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
const googleProvider = new GoogleAuthProvider();

// ユーザー情報新規登録
async function addUser(name: any, language: any, uuid: any) {
  const update = Timestamp.now();
  const docRef = await setDoc(doc(db, "user-data", uuid), {
    name: name,
    uuid: uuid,
    level: 1.0,
    money: 0,
    win: 0,
    lose: 0,
    language: language,
    update: update, 
    assign: "-",
    friends: {},
    history: {}
  });
}

// ユーザー情報変更
async function setUser(
    name:     string,
    uuid:     string,
    level:    number,
    money:    number,
    win:      number,
    lose:     number,
    language: string,
    assign:   string,
    friends:  string[],
    history:  string[]) {
  const update = Timestamp.now();
  const docRef = await updateDoc(doc(db, "user-data", uuid), {
    name: name,
    uuid: uuid,
    level: level,
    money: money,
    win: win,
    lose: lose,
    language: language,
    update: update, 
    assign: assign,
    friends: friends,
    history: history
  });
}

// ルーム新規作成
async function addRoom(
  uuid:   string,
  ) {
  const update = Timestamp.now();
  const docRef = await addDoc(collection(db, "room-data"), {
    host:   { uuid: uuid, number: null, character: null },
    guest:  { uuid: null, number: null, character: null },
    data:   { state: "lobby", turn: -1, update: update },
    rule:   { timeLimits: 60, turns: -1, effects: true },
    update: update,
  });
  return docRef.id;
}

// ルール変更
async function setRules(
  roomId:     string,
  timeLimits: number,
  turns:      number,
  effects:    string
  ) {
  const update = Timestamp.now();
  const docRef = await updateDoc(doc(db, "room-data", roomId), {
    rule:   { timeLimits: timeLimits, turns: turns, effects: effects },
    update: update,
  });
}

// 考察 (番号) を送信する
async function setPredict(
  predict: any, 
  effectId: any, 
  playerUuid: any,
  roomId: any
  ) {
  const update = Timestamp.now();
  const gameDataRef = collection(db, "room-data", roomId, "game-data");
  const docRef = await addDoc(gameDataRef, {
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

// ユーザーメッセージ送信
async function setMessage(
  message: string, 
  playerUuid: string,
  roomId: string
  ) {
  const update = Timestamp.now();
  const gameDataRef = collection(db, "room-data", roomId, "game-data");
  const docRef = await addDoc(gameDataRef, {
    message:  message,
    playerUuid: playerUuid,
    update:  update,
    type: 'message',
  });
}

export {db, storage, googleProvider, auth, addUser, setUser, addRoom, setPredict, setMessage, setRules};