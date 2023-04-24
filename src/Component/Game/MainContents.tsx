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
import { useForm } from '@mantine/form';
import { setPredict } from '../../Config/firebase'
import { useParams } from 'react-router-dom';


export function MainContents({height, roomData, /*userData*/}: any) {
  const roomId = useParams();
  const [opened, { toggle }] = useDisclosure(true);
  const theme = useMantineTheme();
  const [sending, setSending] = useState(false);

  const form = useForm({
    initialValues: {
      predict:  0,
      effectId: '',
    },

    validate: {
      
    },
  });

  async function submit(predict: any, effectId: any, playerUuid: any){
    setSending(true);     // 送信中に決定ボタンを押せないようにローディングを表示
    await setPredict(predict, effectId, playerUuid, roomId.id);  // firebaseにデータを追加
    setSending(false);    // ローディングを非表示
    form.reset();         // フォームに書き込んだ情報をリセット
    setSending(false);
  }

  return (
    <>
      <Group position="apart" px="sm" pt="sm" >
      {/*<Badge size="lg" className="badge">{opened ? (roomData.host.uuid === userData.uuid ? roomData.host.name : roomData.guest.name) : (roomData.host.uuid === userData.uuid ? roomData.guest.name : roomData.host.name)}</Badge>*/}
      <Badge size="lg" className="badge">{opened ? (roomData.host.name) : (roomData.guest.name)}</Badge>
        <Tooltip label={opened ? "あいての情報をみる" : "じぶんの情報をみる"}>
          <ActionIcon variant="transparent" onClick={toggle}><AiOutlineUserSwitch size="20"/></ActionIcon>
        </Tooltip>
      </Group>
      <Group mt="3px">
        <Box ml="xl" w="6em">
          <Group>
            <Text color="dark" weight="bold" size={px(theme.spacing.xs)/5*4} variant="dot" >
                {/*Lv.{opened ? (roomData.host.uuid === userData.uuid ? roomData.host.level : roomData.guest.level) : (roomData.host.uuid === userData.uuid ? roomData.guest.level : roomData.host.level)}*/}
                Lv.{opened ? roomData.host.level : roomData.guest.level}
            </Text>
            <Text color="dark" weight="bold" size={px(theme.spacing.xs)/5*4} variant="dot">
            {/*opened ? (roomData.host.uuid === userData.uuid ? roomData.host.win+"/"+roomData.host.lose : roomData.guest.win+"/")+roomData.guest.lose : (roomData.host.uuid === userData.uuid ? roomData.guest.win+"/"+roomData.guest.lose : roomData.host.win+"/")*/}
            {opened ? roomData.host.win+"/"+roomData.host.lose : roomData.guest.win+"/"+roomData.guest.lose}
            </Text>
          </Group>
          <Progress size="xs" radius="md" color="dark" value={20} >aaa</Progress>
        </Box>
      </Group>

      <Container pt="xl">
        {/*<form onSubmit={form.onSubmit((values) => { submit(values.predict, values.effectId, userData.uuid); })}>*/}
        <form onSubmit={form.onSubmit((values) => { submit(values.predict, values.effectId, roomData.host.uuid); })}>
          <Flex
            mih={50}
            gap="md"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
          >
            <AspectRatio ratio={500/500} h={height/12*5} w={height/12*5}>
              <Image src="../images/nekoninja.png" className="mainCharacter" />
            </AspectRatio>
            <Title size={height/12*1}>1234</Title>
            
            
            <Group position="right" h={height/12} >
              <PinInput {...form.getInputProps('predict')} color="yellow" size="md" type="number" />
              <Button type="submit" loading={sending} color="yellow" className="button" ><IconSend size="1.3rem"/></Button>
            </Group>
          </Flex>
        </form>
      </Container>
    </>
  )
}
