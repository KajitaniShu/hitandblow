import '../css/GameScene.css';
import { auth } from '../Config/firebase'
import { useAuthState, useSignInWithFacebook } from 'react-firebase-hooks/auth'
import { Admin } from '../Admin/Admin'
import { Home } from '../Component/Home/Home'
import { Loading } from '../Component/Loading'


export function HomeScene() {
  const [user, initialising] = useAuthState(auth);

  return (
    <>
      {(() => {
        if(initialising) return <Loading />         // ユーザーデータ取得中はローディング画面を出す
        else if(user)    return <Home user={user}/> // ログイン済み
        else             return <Admin />           // 未ログイン
      })()}
    </>
  )
}
