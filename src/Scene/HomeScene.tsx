import React, {useEffect, useState} from 'react'
import { 
  Group, 
  Container,
  Paper, 
  ScrollArea,
  Text,
  px,
  Progress,
  Box,
  useMantineTheme,
  Header,
  ActionIcon,
  Avatar,
  Title,
  SimpleGrid,
  Grid,
  rem,
  Button,
  Burger,
  Menu
} from '@mantine/core';
import { 
  useDisclosure, 
  useViewportSize
} from '@mantine/hooks';
import './GameScene.css';
import { useForm } from '@mantine/form';
import { PageNotFound } from '../Component/PageNotFound';
import { Login } from '../Admin/Login';
import { db }  from '../Config/firebase';
import {collection, doc, getDocs, query, where } from 'firebase/firestore';
import { auth } from '../Config/firebase'
import { useAuthState, useSignInWithFacebook } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router-dom'
import { GameSetting } from '../Component/GameSetting';
import { CharacterSelect } from '../Component/CharacterSelect';
import { Ad } from '../Component/Ad';
import { Clock } from '../Component/Clock'
import { Admin } from '../Admin/Admin'
import { Home } from '../Component/Home'


export function HomeScene() {
  const { width, height } = useViewportSize();
  const theme = useMantineTheme();
  const componentHeight = px(rem(170));
  const SECONDARY_TOP_HEIGHT= `calc(${componentHeight} / 3 - ${theme.spacing.md})`;
  const SECONDARY_BOTTOM_HEIGHT= `calc((${SECONDARY_TOP_HEIGHT} + ${theme.spacing.md} )*2)`;
  const CENTER_MARGIN = height/7;

  const [user, initialising] = useAuthState(auth);
  const [contentsIndex, setContentsIndex] = useState<string>("");
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState('一覧');
  const [database, setDatabase] = useState<any>();

  
  useEffect(() => {
    if(user && database === undefined){
      // データを取得
      let _database: any = [];
      const dataList = query(collection(db, "user-data"), where("uuid", "==", user.uid));
      getDocs(dataList).then((snapShot)=>{
        const _data = JSON.stringify(snapShot.docs.map((doc) => {
          const data = doc.data();
          _database.push({
            id:     doc.ref.id,
            name:   data.name,
            uuid:   data.uuid,
            update: data.update,
            json:   JSON.parse(data.json || "[]")
          })
        }));
        setDatabase(_database);
      })
    }
  }, [user]);

  return (
    <div style={{height:height}}>
      {!user ?
        <Admin/>
        :
        <Home />
      }
    </div>
  )
}
