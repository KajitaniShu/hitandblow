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
  Flex,
  Menu,
  Modal,
  TextInput,
  Center,
  Badge,
  Button,
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
  IconPlayerPlayFilled,
  IconLogout
} from '@tabler/icons-react';
import { GameSetting } from './GameSetting';
import { Host } from './Host';
import { Guest } from './Guest';
import {collection, doc, getDocs, query, where, getFirestore } from 'firebase/firestore';
import { db }  from '../../Config/firebase';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { Head } from '../Head'
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';



export function Home({user}: any) {
  const theme = useMantineTheme();
  const componentHeight = px(rem(170));
  const SECONDARY_TOP_HEIGHT= `calc(${componentHeight} / 3 - ${theme.spacing.md})`;
  const SECONDARY_BOTTOM_HEIGHT= `calc((${SECONDARY_TOP_HEIGHT} + ${theme.spacing.md} )*2)`;
  const userQuery = query(collection(db, "user-data"), where("uuid", "==", user.uid));
  const [userData, loading, error, snapshot, reload] = useCollectionDataOnce(userQuery);
  const { width, height } = useViewportSize();
  
  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);


  return (
    <>
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
                  <Host userData={userData} height={rem(200)}/>
                  <Guest userData={userData} height={rem(200)}/>
                </Flex>
              </Grid.Col>
              <Grid.Col  span={2}>
                <GameSetting userData={userData} height={px(rem(400))+px(rem(theme.spacing.md))}/>
              </Grid.Col>
            </Grid>
            
            <Group position='right' w="100%" pt="lg">
            <Button 
              size="lg" color="dark" mr="md" radius="sm"
              leftIcon={<IconPlayerPlayFilled/>}
              styles={(theme) => ({
                leftIcon: {
                  marginRight: theme.spacing.md,
                },
              })}
            >ゲームスタート</Button>
          </Group>
            </Flex>
          </Center>
          
          
        </Container>
        :
        
              <>
        <Carousel  mx="auto"  h={height-px(rem(150))} withIndicators withControls={false} getEmblaApi={setEmbla}>
        <Carousel.Slide>
          <Container p="md" size="30rem"  h={height-px(rem(150))}> 
          <Center h={height-px(rem(150))}>
            <Flex
              gap="md"
              align="flex-start"
              direction="row"
              wrap="wrap"
              mb="xl"
            >
              <Host userData={userData} height={rem(200)}/>
              <Guest userData={userData} height={rem(200)}/>
            </Flex>
            </Center>
          </Container>
        </Carousel.Slide>
        <Carousel.Slide>
          <Container p="md" size="30rem"  h={height-px(rem(150))}> 
          <Center h={height-px(rem(150))}>
            <Group noWrap mb="xl" w="100%">
            <GameSetting userData={userData} height={px(rem(400))+px(rem(theme.spacing.md))}/>
            </Group>
          </Center>
          </Container>
        </Carousel.Slide>
      </Carousel> 
      <Group position='right' w="100%" pt="lg">
      <Button 
        size="lg" color="dark" mr="md" radius="sm"
        leftIcon={<IconPlayerPlayFilled/>}
        styles={(theme) => ({
          leftIcon: {
            marginRight: theme.spacing.md,
          },
        })}
      >ゲームスタート</Button>
    </Group>
    </>
        }
        </>
  )
}
