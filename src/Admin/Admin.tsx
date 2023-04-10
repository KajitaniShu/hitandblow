import { useState, useEffect } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Avatar,
  MediaQuery,
  Group,
  Code,
  Title,
  Burger,
  createStyles,
  useMantineTheme,
  ScrollArea,
  Button,
  Image,
  Box,
  Card,
} from '@mantine/core';

import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { PageNotFound } from '../Component/PageNotFound';
import { Login } from './Login';
import { db }  from '../Config/firebase';
import {collection, doc, getDocs, query, where } from 'firebase/firestore';
import { auth } from '../Config/firebase'
import { useAuthState, useSignInWithFacebook } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router-dom'


export function Admin() {
  const [user, initialising] = useAuthState(auth);
  const [contentsIndex, setContentsIndex] = useState<string>("");
  const theme = useMantineTheme();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState('一覧');
  const [database, setDatabase] = useState<any>(); 
  const { width, height } = useViewportSize();

  
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
    console.log(user);
  }, [user]);

  return (
    
      <Card 
        w={"100%"} h={"100%"} sx={{position:"relative"}} withBorder
      >
        <Card.Section>
          <Login />
        </Card.Section>
      </Card>
  );
}