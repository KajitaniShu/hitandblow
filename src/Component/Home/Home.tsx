import React, {useEffect, useState} from 'react'
import { 
  Group, 
  Container,
  Text,
  px,
  useMantineTheme,
  Grid,
  rem,
  Flex,
  Center,
  Button,
  CopyButton
} from '@mantine/core';
import {
  useViewportSize,
} from '@mantine/hooks';
import { 
  IconPlayerPlayFilled,
  IconShare2,
  IconCheck
} from '@tabler/icons-react';
import { GameSetting } from './GameSetting';
import { Host } from './Host';
import { Guest } from './Guest';
import {collection, query, where } from 'firebase/firestore';
import { db }  from '../../Config/firebase';
import { useCollectionDataOnce, useCollectionData } from 'react-firebase-hooks/firestore';
import { Head } from '../Head'
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';
import { addRoom, assignRoom } from '../../Config/firebase'


export function Home({user}: any) {
  const theme = useMantineTheme();
  const userQuery = query(collection(db, "user-data"), where("uuid", "==", user.uid));
  const [userData, loading, error, snapshot, reload] = useCollectionDataOnce(userQuery);
  const roomID = userData && userData[0] && userData[0].assign ? userData[0].assign : "-";
  
  const roomQuery = query(collection(db, "room-data"), where('__name__', '==', roomID));
  const [roomData] = useCollectionData(roomQuery);

  const { width, height } = useViewportSize();
  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  // ルーム新規作成
  async function createRoom(){
    if(userData && userData[0]) {
      const roomId = await addRoom(userData[0].uuid);         // ルーム追加
      await assignRoom(                                       // ユーザー情報に入室済みルームとして追加
        true,                 // isHost
        userData[0].uuid,     // uuid,
        roomId,               // roomId
      );
      reload();
    }
  };
  
  useEffect(() => {
    // ユーザー情報が登録されている & 入室しているルームがない
    if(userData && userData.length > 0 && userData[0].assign === null) {
      // ルームを追加し、入室済みにする
      console.log("addRoom", userData, roomData);
      createRoom();
    }
  },[userData])
  

  return (
    <>
    <div style={{height: height, backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.yellow[4] }}>
      <Head userData={userData} reload={reload} user={user} height={rem(50)}/>
        { width > 750 ? 
        <Container pt="sm" size="md">
          <Center h={height-px(rem(70))} w="100%"> 
          <Flex
            w="90%"
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="column"
            wrap="wrap"
          >
            <Grid grow w="100%" >
              <Grid.Col span={1} >
                <Flex
                  gap="md"
                  justify="flex-start"
                  align="flex-start"
                  direction="column"
                  wrap="wrap"
                >
                  <Host userData={userData} roomData={roomData} height={rem(180)}/>
                  <Guest userData={userData} roomData={roomData} height={rem(180)}/>
                </Flex>
              </Grid.Col>
              <Grid.Col  span={2}>
                <GameSetting roomData={roomData} userData={userData} height={px(rem(360))+px(rem(theme.spacing.md))}/>
              </Grid.Col>
            </Grid>
            
            <Group position='right' w="100%" pt="lg">
              {userData && userData.length > 0 && userData[0].assign && userData[0].assign !== "-" && 
              <CopyButton value={window.location.href + "invite/" + userData[0].assign}>
                {({ copied, copy }) => (
                <Button
                  onClick={copy}
                  variant="filled"
                  size="lg" radius="sm"
                  leftIcon={copied ? <IconCheck /> : <IconShare2/>}
                  styles={(theme) => ({
                    root: {
                      backgroundColor: 'black',
                      '&:not([data-disabled])': theme.fn.hover({
                        backgroundColor: theme.fn.darken('#222', 0.05),
                      }),
                    },
                    leftIcon: {
                      marginRight: theme.spacing.sm,
                    },
                  })}
                >
                  招待
                </Button>
                )}
              </CopyButton>
              }
              <Button 

                size="lg"  mr="md" radius="sm"
                leftIcon={<IconPlayerPlayFilled style={{color: "white"}}/>}
                styles={(theme) => ({
                  root: {
                    backgroundColor: 'black',
                    '&:not([data-disabled])': theme.fn.hover({
                      backgroundColor: theme.fn.darken('#222', 0.05),
                    }),
                  },
                  leftIcon: {
                    marginRight: theme.spacing.sm,
                  },
                })}
              ><Text color="white">開始</Text></Button>
            </Group>
            </Flex>
          </Center>
        </Container>
        :
        <>
        <Carousel mx="auto" h={height-px(rem(150))} withIndicators withControls={false} getEmblaApi={setEmbla}>
        <Carousel.Slide>
          <Container p="md" size="30rem"  h={height-px(rem(150))}> 
          <Center h={height-px(rem(150))}>
            <Flex
              gap="md"
              align="flex-start"
              direction="row"
              wrap="wrap"
              w="100%"
              mb="xl"
            >
              <Host userData={userData} roomData={roomData} height={rem(200)}/>
              <Guest userData={userData} roomData={roomData} height={rem(200)}/>
            </Flex>
            </Center>
          </Container>
        </Carousel.Slide>
        <Carousel.Slide>
          <Container p="md" size="30rem"  h={height-px(rem(150))}> 
          <Center h={height-px(rem(150))}>
            <Group noWrap mb="xl" w="100%">
            <GameSetting roomData={roomData} userData={userData} height={px(rem(400))+px(rem(theme.spacing.md))}/>
            </Group>
          </Center>
          </Container>
        </Carousel.Slide>
      </Carousel> 
      <Container size="xs">
        <Group position='right'>
          {userData && userData.length > 0 && userData[0].assign && userData[0].assign !== "-" && 
            <CopyButton value={window.location.href + "invite/" + userData[0].assign}>
              {({ copied, copy }) => (
              <Button
                onClick={copy}
                size="md" radius="sm"
                styles={(theme) => ({
                  root: {
                    backgroundColor: 'black',
                    '&:not([data-disabled])': theme.fn.hover({
                      backgroundColor: theme.fn.darken('#222', 0.05),
                    }),
                  },
                  leftIcon: {
                    marginRight: theme.spacing.sm,
                  },
                })}
              >
                {copied ? <IconCheck style={{color: "white"}}/> : <IconShare2 style={{color: "white"}}/>}
                
              </Button>
              )}
            </CopyButton>
          }
          <Button
            size="md" radius="xs"
            leftIcon={<IconPlayerPlayFilled style={{color: "white"}}/>}
            styles={(theme) => ({
              root: {
                backgroundColor: 'black',
                '&:not([data-disabled])': theme.fn.hover({
                  backgroundColor: theme.fn.darken('#222', 0.05),
                }),
              },
              leftIcon: {
                marginRight: theme.spacing.sm,
              },
            })}
          ><Text color="white">開始</Text></Button>
        </Group>
      </Container>
    </>
  }
  </div>
  </>
  )
}
