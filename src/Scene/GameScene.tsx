import { useState } from 'react';

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
import {collection, query, where, doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db }  from '../Config/firebase';
import { PageNotFound } from '../Component/PageNotFound';
import { Loading } from '../Component/Loading'
import { useAuthState, useSignInWithFacebook } from 'react-firebase-hooks/auth'
import { auth } from '../Config/firebase'


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
  //const [userData, userDataloading, usrDataError, usrDataSnapshot, usrDataReload] = useDocumentDataOnce(usrDataRef);
  console.log(roomData);
  //console.log(userData);
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
      /*else if(!userData)              return <LoginModal />    // 未ログイン*/

      else                return (
        <>
          <Header height={rem(50)} px="md" className="header">
            <Container pt="sm">
              <Group position="apart" sx={{ height: '100%' }}>
                <Title order={1} size="h4" color="white">Hit&Blow online</Title>
                <Group position="right" noWrap>
                  <ActionIcon style={{color: "white"}} variant="transparent"><IoIosShareAlt size="20"/></ActionIcon>
                  <ActionIcon style={{color: "white"}} variant="transparent"><IconInfoSquareRoundedFilled size="20"/></ActionIcon>
                </Group>
              </Group>
            </Container>
          </Header>
          {width > 900 ?
            <GameScenePC
              roomData={roomData}
              user={user}
              className={classes.pc} 
            />
            :
            <GameSceneSP
              roomData={roomData}
              user={user}
              className={classes.sp} 
            />
          }  
        </>
  );
}