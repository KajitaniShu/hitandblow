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
  px
} from '@mantine/core';
import { 
  IconBrandTelegram,
} from '@tabler/icons-react';
import { 
  IconCirclePlus,
  IconSend
} from '@tabler/icons-react';
import { db }  from '../../Config/firebase';
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import {format} from 'date-fns'


export function Chat({roomData, user, height}: any) {
  const roomId = useParams();   // URLから取得したルームID
  const [messages, setMessages] = useState<any>([]);   // メッセージと予測番号

  useEffect(() =>{
    if(roomId.id){
      const ref = collection(db, "room-data", roomId.id, "game-data");
      const msg = onSnapshot(query(ref, orderBy("update")), (querySnapshot) => {
        setMessages(querySnapshot.docs.map((doc => ({ ...doc.data() }))));
        
      });
    }
    
  
  })
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
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <form >
            <TextInput
              size="lg"
              color="#585497"
              placeholder="メッセージを入力"
          />
          </form>
          <Button type="submit" /*loading={sending}*/ variant="outline" color="dark" size="lg" className="button" ><IconSend size="1.3rem"/></Button>
        </Flex>
      </Container>
  )
}
