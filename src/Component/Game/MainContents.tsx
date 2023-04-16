import React, {useState} from 'react'
import '../../css/panel.css'
import '../../css/button.css'
import '../../css/badge.css'
import { 
  Group, 
  Container,
  ScrollArea,
  Text,
  Image,
  Badge,
  AspectRatio,
  Title,
  Center,
  Paper,
  Divider, 
  Tooltip,
  ActionIcon,
  Flex,
  PinInput,
  Button,
  useMantineTheme,
  px,
  Box,
  Progress,
} from '@mantine/core';
import { Carousel, useAnimationOffsetEffect, Embla } from '@mantine/carousel';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconCirclePlus,
  IconSend
} from '@tabler/icons-react';
import {
  AiOutlineUserSwitch
} from 'react-icons/ai'


export function MainContents({height, myside, enemy}: any) {
  const [opened, { toggle }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <div className="panel panel-shadow panel-border" style={{height: height }}>
      <Group position="apart" px="sm" pt="sm" >
        <Badge size="lg" className="badge">{opened ? myside.name : enemy.name}</Badge>
        <Tooltip label={opened ? "あいての情報をみる" : "じぶんの情報をみる"}>
          <ActionIcon variant="transparent" onClick={toggle}><AiOutlineUserSwitch size="20"/></ActionIcon>
        </Tooltip>
      </Group>
      <Group mt="3px">
        <Box ml="xl" w="6em">
          <Group>
            <Text color="dark" weight="bold" size={px(theme.spacing.xs)/5*4} variant="dot" >
                Lv.{opened ? myside.level : enemy.level}
            </Text>
            <Text color="dark" weight="bold" size={px(theme.spacing.xs)/5*4} variant="dot">
              {opened ? + " " + myside.win + "/" + myside.lose : enemy.win + "/" + enemy.lose}
            </Text>
          </Group>
          <Progress size="xs" radius="md" color="dark" value={20} >aaa</Progress>
        </Box>
      </Group>

      <Container pt="xl">
        <Flex
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
        <AspectRatio ratio={500/500} h={height/12*5} w={height/12*5}>
          <Image src="../images/akamaru.png" className="mainCharacter" />
        </AspectRatio>
        <Title size={height/12*1}>1234</Title>
          <ScrollArea w="100%" h={height/12} type="never">
            <Group w={2000} h={height/12} >

              <Button variant="default" radius="md" uppercase>
              Settings
            </Button>
            <Button variant="default" radius="md" uppercase>
              Settingsfgggggggggggggggggg
            </Button>
            <Button variant="default" radius="md" uppercase>
              Settingsfgggggggggggggggggg
            </Button><Button variant="default" radius="md" uppercase>
              Settingsfgggggggggggggggggg
            </Button><Button variant="default" radius="md" uppercase>
              Settingsfgggggggggggggggggg
            </Button><Button variant="default" radius="md" uppercase>
              Settingsfgggggggggggggggggg
            </Button>
            </Group>
          </ScrollArea>
        
        
        <Group position="right" h={height/12} >
          <PinInput /*{...form.getInputProps('number')}*/ color="yellow" size="md" type="number"  />
          <Button type="submit" /*loading={sending}*/ color="yellow" className="button" ><IconSend size="1.3rem"/></Button>
        </Group>
      </Flex>
          
      </Container>
      
    </div>
  )
}
