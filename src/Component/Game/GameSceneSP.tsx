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
import { Clock } from './Clock';

export function GameSceneSP({roomData, /*userData*/}: any) {
  const TRANSITION_DURATION = 200;
  const [opened, setOpened] = useState(false);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const theme = useMantineTheme();
  const { height, width } = useViewportSize();
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  return (
      <Carousel  maw={width} mx="auto" pt={(height-px(rem(450))-px(rem(50)))/2} h={height-px(rem(50))} withIndicators withControls={false} getEmblaApi={setEmbla}>
      <Carousel.Slide>
        <Container p="md" h="100%"> 
          <div className="panel panel-shadow panel-border" style={{height: px(rem(450)) }}>
            <MainContents  roomData={roomData} /*userData={userData}*/ height={ px(rem(450)) } />
          </div>
        </Container>
      </Carousel.Slide>
      <Carousel.Slide>
        <Container p="md" h="100%">      
          <div className="panel panel-shadow panel-border" style={{height: px(rem(450)) }}>
            <Chat roomData={roomData} /*userData={userData}*/ height={px(rem(450))}/>
          </div>
        </Container>
      </Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}