import React, {useEffect, useState} from 'react'
import { 
  Group, 
  Container,
  Text,
  px,
  useMantineTheme,
  Header,
  ActionIcon,
  Avatar,
  Title,
  SimpleGrid,
  Grid,
  rem,
  Menu,
  Modal,
  TextInput,
  Center,
  Badge,
  Skeleton
} from '@mantine/core';
import {
  useViewportSize,
  useDisclosure
} from '@mantine/hooks';
import { 
  IconDiamondFilled,
  IconInfoSquareRoundedFilled,
  IconZoomQuestion,
  IconUserCircle,
  IconTrophy,
  IconLogout
} from '@tabler/icons-react';
import { GameSetting } from './GameSetting';
import { CharacterSelect } from './CharacterSelect';
import {collection, doc, getDocs, query, where, getFirestore } from 'firebase/firestore';
import { db }  from '../../Config/firebase';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { Head } from '../Head'



export function Home({user}: any) {
  const theme = useMantineTheme();
  const componentHeight = px(rem(170));
  const SECONDARY_TOP_HEIGHT= `calc(${componentHeight} / 3 - ${theme.spacing.md})`;
  const SECONDARY_BOTTOM_HEIGHT= `calc((${SECONDARY_TOP_HEIGHT} + ${theme.spacing.md} )*2)`;
  const userQuery = query(collection(db, "user-data"), where("uuid", "==", user.uid));
  const [userData, loading, error, snapshot, reload] = useCollectionDataOnce(userQuery);
  const { width, height } = useViewportSize();


  return (
    <div style={{height:height}}>
      <Head userData={userData} reload={reload} user={user}/>
        <Container pt="sm" mt={(height-px(rem(600)))/2}>
          <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
              <GameSetting userData={userData} height={px(rem(510))}/>
              <Grid gutter="md">
              <Grid.Col >
                <CharacterSelect height={px(rem(510))}/>
              </Grid.Col>

              <Grid.Col>
              </Grid.Col>
            </Grid>
          </SimpleGrid>
        </Container>
    </div>
  )
}
