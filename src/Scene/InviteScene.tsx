import React from 'react'
import { useParams } from 'react-router-dom';
import { 
  Button
} from '@mantine/core';
import { auth } from '../Config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Admin } from '../Admin/Admin'
import { Invite } from '../Component/Home/Invite'
import { Loading } from '../Component/Loading'

export function InviteScene() {
  const {id} = useParams();
  const [user, initialising] = useAuthState(auth);

  return (
    <>
      {(() => {
        if(initialising) return <Loading />                   // ユーザーデータ取得中はローディング画面を出す
        else if(user)    return <Invite user={user} id={id}/> // ログイン済み
        else             return <Admin />                     // 未ログイン
      })()}
    </>
  )
}
