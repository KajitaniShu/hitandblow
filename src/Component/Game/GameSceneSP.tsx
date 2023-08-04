import { useState} from 'react'
import { 
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
import { ClockSP } from './ClockSP';

export function GameSceneSP({roomData, messages, user}: any) {
  const TRANSITION_DURATION = 200;
  const [opened, setOpened] = useState(false);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const theme = useMantineTheme();
  const { height, width } = useViewportSize();
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  return (
    <>
      <Container pt={px(rem(35))} >
        {/* <ClockSP height={px(rem(30))} roomData={roomData} messages={messages}/> */}
      </Container>
      <Carousel maw={width} mx="auto"  h={height-px(rem(105))} withIndicators withControls={false} getEmblaApi={setEmbla}>
        <Carousel.Slide>
          <Container p="md" h="100%"> 
            <div className="panel panel-shadow panel-border" style={{height: px(rem(450)) }}>
              <MainContents  roomData={roomData} user={user} height={ px(rem(450)) } />
            </div>
          </Container>
        </Carousel.Slide>
        <Carousel.Slide>
          <Container p="md" h="100%">      
            <div className="panel panel-shadow panel-border" style={{height: px(rem(450)) }}>
              <Chat roomData={roomData} messages={messages} user={user} height={px(rem(450))}/>
            </div>
          </Container>
        </Carousel.Slide>
      </Carousel> 
    </>
  );
}