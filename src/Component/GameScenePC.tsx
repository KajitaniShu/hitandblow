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

export function GameScenePC({mySide, enemy, messageList, form}: any) {
  const theme = useMantineTheme();
  const { height, width } = useViewportSize();

  return (
    <>
      <Container pt="sm" h={height-px(rem(50))}>
        <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <MainContents mySide={mySide} enemy={enemy} form={form} height={rem(600)} />
        <Grid gutter="md">

          <Grid.Col span={7}>
            <Ad height={px(rem(300))-px(theme.spacing.md)} />
          </Grid.Col>

          <Grid.Col span={5}>
            <Clock height={px(rem(300))-px(theme.spacing.md)} time={60} />
          </Grid.Col>

          <Grid.Col>
            <Chat mySide={mySide} enemy={enemy} messageList={messageList} form={form} height={rem(600)}/>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
      </Container>
    </>
  );
}