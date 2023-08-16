import React, { useEffect, useState } from 'react'
import {collection, query, where } from 'firebase/firestore';
import { useCollectionDataOnce, useCollectionData } from 'react-firebase-hooks/firestore';
import { db }  from '../../Config/firebase';
import { assignRoom, setPlayerData, addUser } from '../../Config/firebase'
import { useNavigate } from 'react-router-dom';
import { Loading } from '../Loading'
import { PageNotFound } from '../PageNotFound';


export function Invite({user, id}: any) {
  const [page, setPage] = useState("loading");
  const userQuery = query(collection(db, "user-data"), where("uuid", "==", user.uid));
  const [userData, loading, error, snapshot, reload] = useCollectionDataOnce(userQuery);
  const roomQuery = query(collection(db, "room-data"), where('__name__', '==', id));
  const [roomData] = useCollectionData(roomQuery);
  const navigate = useNavigate();

  // ルーム入室
  async function enterRoom(){
    if(userData && userData.length > 0){
      await setPlayerData(
        false,              // isHost,
        id,                 // roomId,
        user.uid,           // uuid,
        null,               // number,
        null,               // character
        userData[0].name,   // name
        userData[0].level,  // level
        userData[0].win,    // win
        userData[0].lose,   // lose
      );
      
      await assignRoom(     // ユーザー情報に入室済みルームとして追加
        false,              // isHost
        user.uid,           // uuid,
        id,                 // roomId
      );
      
      navigate("/",  { replace: true })
    }
  };
  
  useEffect(() => {
    if(userData && userData.length === 0) { addUser(null, 'japanese', user.uid); reload(); }  // 未登録のユーザーの場合，追加する
    else if(roomData === undefined || roomData.length === 0) {}
    else if(roomData[0].guest.uuid === null || roomData[0].guest.uuid === "") enterRoom();     // guest枠が空いており，入室出来る場合 → 入室済みとして登録 & ルームに移動
    else if(userData && userData.length > 0 && roomData[0].guest.uuid === userData[0].uuid) enterRoom();  // ゲストとアクセスした本人が同じ → 入室済みとして登録 & ルームに移動
    else { setPage("notfound"); }
  }, [userData])

  return (
    <>
      {page === "loading" && <Loading/>}
      {page === "notfound" && <PageNotFound />}
    </>
  )
}
