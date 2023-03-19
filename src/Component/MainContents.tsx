import React from 'react'
import { 
  Group, 
  Container,
  Paper, 
  ScrollArea,
  Text,
  Avatar,
  useMantineTheme,
  Button,
  TextInput,
  Flex,
  Image,
  Card,
  Badge,
  ActionIcon,
  px,
  Progress,
  Box,
  AspectRatio,
  Center,
  Title,
  PinInput,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconDotsVertical,
  IconBrandTelegram,
} from '@tabler/icons-react';
import {
  AiOutlineUserSwitch
} from 'react-icons/ai'
import '../Scene/GameScene.css';

export function MainContents({mySide, enemy, form, height}:any) {
  const theme = useMantineTheme();
  const MAIN_HEIGHT= height * 3  + px(theme.spacing.md);
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <div style={{backgroundColor:"#26254A", height: MAIN_HEIGHT, borderRadius: "8px", }}>
      <Group position="apart" px="sm" pt="sm" >
        <Badge size="lg" className="gray">{opened ? mySide.name : enemy.name}</Badge>
        <Tooltip label={opened ? "あいての情報をみる" : "じぶんの情報をみる"}>
          <ActionIcon variant="transparent" onClick={toggle}><AiOutlineUserSwitch size="20"/></ActionIcon>
        </Tooltip>
      </Group>

      <ScrollArea>
      <Group mt="3px">
        <Box ml="xl">
          <Group>
            <Text color="#9491CF"  size={px(theme.spacing.xs)/5*4} variant="dot" >
                Lv.{opened ? mySide.level : enemy.level}
            </Text>
            <Text color="#9491CF" size={px(theme.spacing.xs)/5*4} variant="dot">
              {opened ? mySide.win + "/" + mySide.lose : enemy.win + "/" + enemy.lose}
            </Text>
          </Group>
          <Progress size="xs" radius="md" color="#9491CF" className="gray"  value={20} >aaa</Progress>
        </Box>
      </Group>

      <Container pt="md">
        <Flex
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="column"
          wrap="nowrap"
        >
          <AspectRatio ratio={500/500} w={height/5*7}>
            <Image src={opened ? mySide.image : enemy.image} className="mainCharacter" />
          </AspectRatio>
          
          <Title order={3} size="50" color="white">
          {opened ? mySide.number.replace(/(.)(?=.)/g, "$1 ")  : "? ? ? ?"}
          </Title>
          <Flex
          mt="lg"
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Group position="center">
            <PinInput color="yellow" type="number" />
          </Group>
          <Button radius="lg" bg="#F8B723" color="yellow"><IconBrandTelegram size="1rem" /></Button>
        </Flex>
        </Flex>
      </Container>
      </ScrollArea>
      
    </div>
  )
}
