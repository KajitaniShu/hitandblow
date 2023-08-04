import { useState} from 'react'
import { 
  Header, 
  Group, 
  ActionIcon, 
  Container,
  rem,
  Text,
  Title,
  useMantineTheme,
  px,
  Badge,
  SimpleGrid,
  Grid,

} from '@mantine/core';
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';
import { 
  useDisclosure,
  useViewportSize 
} from '@mantine/hooks';
import {
  IconInfoSquareRoundedFilled,
  IconAlarmFilled
} from '@tabler/icons-react';
import {
  IoIosShareAlt
} from 'react-icons/io'
import { MainContents } from './MainContents';
import { Chat } from './Chat';
import { Ad } from './Ad';
import { Clock } from './Clock';

export function GameScenePC({roomData, messages, user}: any) {
  const theme = useMantineTheme();
  const { height, width } = useViewportSize();

  return (
    <>
      <Container h={height-px(rem(50))} pt={(height-px(rem(650)))/2}>
        <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <div className="panel panel-shadow panel-border" style={{height: rem(600) }}>
            <MainContents roomData={roomData} /*userData={userData}*/ height={px(rem(600))} />
          </div>
        <Grid gutter="md">

          <Grid.Col span={7}>
            <div className="panel panel-shadow panel-border" style={{height: px(rem(200))-px(theme.spacing.md) }}>
              <Ad height={px(rem(200))-px(theme.spacing.md)} />
            </div>
          </Grid.Col>

          <Grid.Col span={5}>
            <div className="panel panel-shadow panel-border" style={{height: px(rem(200))-px(theme.spacing.md) }}>
              {/* <Clock height={px(rem(200))-px(theme.spacing.md)} roomData={roomData} messages={messages}/> */}
            </div>
          </Grid.Col>

          <Grid.Col>
            <div className="panel panel-shadow panel-border" style={{height: rem(400) }}>
              <Chat  roomData={roomData} messages={messages} user={user} height={px(rem(400))}/>
            </div>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
      </Container>
    </>
  );
}