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
import '../css/GameScene.css';
import { auth } from '../Config/firebase'
import { useAuthState, useSignInWithFacebook } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router-dom'
import { GameSetting } from '../Component/Home/GameSetting';
import { CharacterSelect } from '../Component/Home/CharacterSelect';
import { Ad } from '../Component/Game/Ad';
import { Clock } from '../Component/Game/Clock'
import { Admin } from '../Admin/Admin'
import { Home } from '../Component/Home/Home'
import { Loading } from '../Component/Loading'


export function HomeScene() {
  const { width, height } = useViewportSize();
  const theme = useMantineTheme();
  const componentHeight = px(rem(170));
  const SECONDARY_TOP_HEIGHT= `calc(${componentHeight} / 3 - ${theme.spacing.md})`;
  const SECONDARY_BOTTOM_HEIGHT= `calc((${SECONDARY_TOP_HEIGHT} + ${theme.spacing.md} )*2)`;
  const CENTER_MARGIN = height/7;

  const [user, initialising] = useAuthState(auth);
  return (
    <div style={{height:height}}>
      {(() => {
        if(initialising) return <Loading />         // ユーザーデータ取得中はローディング画面を出す
        else if(user)    return <Home user={user}/> // ログイン済み
        else             return <Admin />           // 未ログイン
        return <Loading />
      })()}
    </div>
  )
}
