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
  PinInput
} from '@mantine/core';
import { 
  IconDotsVertical,
  IconBrandTelegram,
} from '@tabler/icons-react';
import '../Scene/GameScene.css';

export function MainContents({mySide, enemy, form, height}:any) {
  const theme = useMantineTheme();
  const MAIN_HEIGHT= height * 3  + px(theme.spacing.md);

  return (
    <div style={{backgroundColor:"#26254A", height: MAIN_HEIGHT, borderRadius: "8px", }}>
      <Group position="apart" px="sm" pt="sm" >
        <Badge size="lg" className="gray">{mySide.name}</Badge>
        <ActionIcon variant="transparent"><IconDotsVertical size="20"/></ActionIcon>
      </Group>

      <ScrollArea>
      <Group mt="3px">
        <Box ml="xl">
          <Group>
            <Text color="#9491CF"  size={px(theme.spacing.xs)/5*4} variant="dot" >
                Lv.{mySide.level}
            </Text>
            <Text color="#9491CF" size={px(theme.spacing.xs)/5*4} variant="dot">
              {mySide.win + "/" + mySide.lose}
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
            <Image src={mySide.image} className="mainCharacter" />
          </AspectRatio>
          
          <Title order={3} size="50" color="white">
              0123
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
