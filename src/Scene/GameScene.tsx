import { useState, useEffect } from 'react';

import { 
  Header, 
  Group, 
  ActionIcon, 
  Container,
  rem,
  Title,
  createStyles
} from '@mantine/core';
import {
  IconInfoSquareRoundedFilled,
} from '@tabler/icons-react';
import {
  IoIosShareAlt
} from 'react-icons/io'
import '../css/GameScene.css';
import '../css/button.css'
import { useViewportSize  } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { GameScenePC } from '../Component/Game/GameScenePC'
import { GameSceneSP } from '../Component/Game/GameSceneSP'
import { useParams } from 'react-router-dom';
import {collection, query, where, doc, orderBy, onSnapshot } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db }  from '../Config/firebase';
import { PageNotFound } from '../Component/PageNotFound';
import { Loading } from '../Component/Loading'
import { useAuthState, useSignInWithFacebook } from 'react-firebase-hooks/auth'
import { auth } from '../Config/firebase'
import { Head } from '../Component/Head'
import { Login } from '../Component/Login'


const useStyles = createStyles((theme) => ({
  sp: {
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },


  pc: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
}));


export function GameScene() {
  const { width, height } = useViewportSize();
  const { classes, theme, cx } = useStyles();
  const roomId = useParams();
  const roomRef = doc(db, "room-data", String(roomId.id));
  const [user, initialising] = useAuthState(auth);
  const [roomData, loading, error, snapshot] = useDocumentData(roomRef);
  const [messages, setMessages] = useState<any>([]);   // メッセージと予測番号

  useEffect(() =>{
    if(roomId.id){
      const ref = collection(db, "room-data", roomId.id, "game-data");
      const msg = onSnapshot(query(ref, orderBy("update")), (querySnapshot) => {
        setMessages(querySnapshot.docs.map((doc => ({ ...doc.data() }))));
      });
    }
  })

  const numberForm = useForm({
    initialValues: {
      number: '',
      termsOfService: false,
  },
    validate: {
    },
  });

  const messageForm = useForm({
    initialValues: {
      message: '',
      termsOfService: false,
  },
    validate: {
    },
  });

      if(loading || initialising)     return <Loading />         // ユーザーデータ取得中はローディング画面を出す
      else if(!roomData)              return <PageNotFound />    // 未登録のルーム
      else if(!user)                  return <Login />           // 未ログイン*/

      else return (
        <>
          <Head  user={user}/>
          {width > 900 ?
            <GameScenePC
              roomData={roomData}
              messages={messages}
              user={user}
              className={classes.pc} 
            />
            :
            <GameSceneSP
              roomData={roomData}
              messages={messages}
              user={user}
              className={classes.sp} 
            />
          }  
        </>
  );
}