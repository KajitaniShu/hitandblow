import { useState } from 'react';
import './GameScene.css';
import { 
  createStyles, 
  Header, 
  Group, 
  ActionIcon, 
  Container,
  Paper, 
  rem,
  Center,
  ScrollArea,
  Badge,
  Text,
  Avatar,
  Grid,
  Tabs,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
  px,
  RingProgress,
  Image,
  Title,
  Button,
  TextInput,
  Flex
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BackButton } from '../Component/BackButton'
import { 
  IconBrandTwitter,
  IconInfoCircle,
  IconDice3Filled,
  IconClockHour3,
  IconDotsVertical,
  IconCheck,
  IconBrandTelegram,
  IconInfoSquareRoundedFilled,
} from '@tabler/icons-react';

import {
  AiOutlineUserSwitch
} from 'react-icons/ai'

import {
  IoIosShareAlt
} from 'react-icons/io'
import '../Component/Button.css'
import { useViewportSize  } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { MainContents } from '../Component/MainContents';
import { Chat } from '../Component/Chat';
import { Ad } from '../Component/Ad';
import { Clock } from '../Component/Clock';


const useStyles = createStyles((theme) => ({
  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  tabsList: {
    borderBottom: '0 !important',
  },

  tab: {
    color: "white",
    borderTopLeftRadius: theme.spacing.xs,
    borderTopRightRadius: theme.spacing.xs,
    fontWeight: 500,
    height: rem(35),
    borderBottom: '0 !important',
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },

    '&[data-active]': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderColor: 'transparent',
      borderBottom: '0 !important',
    },
  },

  mainModule: {
    borderRadius: theme.spacing.xs,
    borderTopLeftRadius: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },

  subModule: {
    borderRadius: theme.spacing.xs,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginTop: rem(35),
  }
  
  
}));




export function GameScene() {
  const [opened, { toggle }] = useDisclosure(false);
  const { width, height } = useViewportSize();
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const componentHeight = px(rem(170));
  const SECONDARY_TOP_HEIGHT= `calc(${componentHeight} / 3 - ${theme.spacing.md})`;
  const SECONDARY_BOTTOM_HEIGHT= `calc((${SECONDARY_TOP_HEIGHT} + ${theme.spacing.md} )*2)`;
  const CENTER_MARGIN = height/8;
  const numberForm = useForm({
    initialValues: {
      number: '',
      termsOfService: false,
  },
    validate: {
    },
  });

  const messageForm = useForm({
    initialValues: {
      message: '',
      termsOfService: false,
  },
    validate: {
    },
  });

  const mySide = {name: "ひいらぎ(こっちーーーーーー)", image: "/images/oni.png", level: 1000, win: 10, lose:12};
  const enemy = {name: "ひいらぎ(あいて)", image: "/images/fighter.png", level: 1, win: 1, lose:2};
  const messageList = [
    {name: "ひいらぎ(こっちーーーーーー)", message: "えおいｊふぉえしｆじょいあｊふぉあいｆ"},
    {name: "ひいらぎ(こっちーーーーーー)", message: "えおいｊふぉえしｆじょいあｊふぉあいｆ"},
    {name: "ひいらぎ(こっちーーーーーー)", message: "えおいｊふぉえしｆじょいあｊふぉあいｆ"},
    {name: "ひいらぎ(あいて)", message: "せｆせｐふぉせふぇｓｆぽえおいｊふぉえしｆじょいあｊふぉあいｆ"},
  ];

  return (
    <div style={{height:height}}>
      <Header height={50} px="md" className="header" bg="dark">
        <Container pt="sm">
          <Group position="apart" sx={{ height: '100%' }}>
          <BackButton/>
            <Group position="right" noWrap>
              <ActionIcon variant="transparent"><IoIosShareAlt size="20"/></ActionIcon>
              <ActionIcon variant="transparent"><IconInfoSquareRoundedFilled size="20"/></ActionIcon>
            </Group>
          </Group>
        </Container>
      </Header>
      
      <Container pt="sm" mt={CENTER_MARGIN}>
        <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <MainContents mySide={mySide} enemy={enemy} form={numberForm} height={componentHeight} />
        <Grid gutter="md">

          <Grid.Col span={7}>
            <Ad height={componentHeight} />
          </Grid.Col>

          <Grid.Col span={5}>
            <Clock height={componentHeight} time={60} />
          </Grid.Col>

          <Grid.Col>
            <Chat mySide={mySide} enemy={enemy} messageList={messageList} form={messageForm} height={componentHeight}/>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
      </Container>
    </div>
  );
}