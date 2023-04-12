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

  return (
    <div style={{height:height}}>
      {(() => {
        if(user) {  // ログイン済み
          return <Home user={user}/>
        }
        else {      // 未ログイン
          return <Admin />
        }
      })()}
    </div>
  )
}
