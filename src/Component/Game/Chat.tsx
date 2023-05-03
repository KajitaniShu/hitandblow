import React, {useEffect, useState, useRef} from 'react'
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
  rem,
  ActionIcon,
  px
} from '@mantine/core';
import { 
  IconBrandTelegram,
} from '@tabler/icons-react';
import { 
  IconCirclePlus,
  IconSend,
  IconArrowRight
} from '@tabler/icons-react';
import { db }  from '../../Config/firebase';
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import {format} from 'date-fns'
import { useForm } from '@mantine/form';
import { setMessage } from '../../Config/firebase'


export function Chat({roomData, messages, user, height}: any) {
  const roomId = useParams();   // URLから取得したルームID
  const [sending, setSending] = useState(false);

  const form = useForm({
    initialValues: {
      message: "",
    },

    validate: {
    },
  });

  async function submit(message: string, uuid: string){
    setSending(true);     // 送信中に決定ボタンを押せないようにローディングを表示
    await setMessage(message, uuid, String(roomId.id));  // firebaseにデータを追加
    setSending(false);    // ローディングを非表示
    form.reset()
  }

  const theme = useMantineTheme();


  return (
      <Container pt="md">
        <Paper p="md"  h={height/7*5}  withBorder>
          <ScrollArea h={"100%"} type="scroll" scrollbarSize={6} offsetScrollbars>
            {messages.map((msg: any, {index}: any) => {return (
              <Flex
                key={index}
                mb="md"
                gap="sm"
                justify={msg.playerUuid===user.uid ? "flex-start" : "flex-end"}
                align="flex-start"
                direction="row"
                wrap="wrap"
              >
                {msg.playerUuid === user.uid ? <Avatar src={"../../images/nekoninja.png"} bg="#585497" radius="xl" size="md" style={{border: "white 2px solid", top:0}} /> : ""}
                  <div style={{maxWidth: "60%"}}>
                    <Group position={msg.playerUuid === user.uid ? "left" : "right"}>
                      <Text size="xs" weight="bold" color={theme.colors.gray[7]}>
                        {msg.playerUuid === roomData.host.uuid ? roomData.host.name : roomData.guest.name}
                      </Text>
                    </Group>
                    
                    <Paper p="xs" bg="white" withBorder style={{wordWrap: "break-word", overflowWrap: "break-word"}}>
                      <Text color="#191736" size="xs" weight="bold">
                        {msg.type === "predict" ? msg.predict : msg.message}
                      </Text>
                    </Paper>
                    <Group position={msg.playerUuid === user.uid ? "left" : "right"}>
                      <Text size="0.5em" color="dimmed">{String(format(msg.update.toDate(), 'hh:mm'))}</Text>
                    </Group>
                  </div>
                {msg.playerUuid !== user.uid ? <Avatar src={"../../images/nezumighost.png"} bg="#585497" radius="xl" size="md" style={{border: "white 2px solid", top:0}} /> : ""}
              </Flex>
            )})}
          </ScrollArea>
        </Paper>

        <Flex
          mt="lg"
          w="100%"
          direction="row"
          wrap="nowrap"
        >
            
          <form style={{width: "100%"}}   onSubmit={form.onSubmit((values) => {  submit(String(values.message), String(user.uid)) })}>
          <Group position="center" w="100%">
            <TextInput
              w={"60%"}
              size="lg"
              color="#585497"
              placeholder="メッセージを入力"
              {...form.getInputProps('message')}
            />
            <Button type="submit" loading={sending} variant="default" className="button" w={"50"} size="lg"><IconSend size="1.3rem"/></Button>
          </Group>
          </form>
        </Flex>
      </Container>
  )
}
