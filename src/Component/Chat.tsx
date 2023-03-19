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
  px
} from '@mantine/core';
import { 
  IconBrandTelegram,
} from '@tabler/icons-react';

export function Chat({mySide, enemy, messageList, messageForm, height}: any) {
  const SECONDARY_BOTTOM_HEIGHT= height*2;
  const theme = useMantineTheme();

  return (
    <div style={{backgroundColor:"#26254A", height: SECONDARY_BOTTOM_HEIGHT, borderRadius: "8px", }}>
      <Container pt="md">
        <Paper p="md"  h={height*4/3} bg="#191736">
          <ScrollArea h={"100%"} type="scroll" scrollbarSize={6}>
            {messageList.map(({name,  message, index}: any) => {return (
              <Flex
                key={index}
                mb="md"
                gap="sm"
                justify={name===mySide.name ? "flex-end" : "flex-start"}
                align="flex-start"
                direction="row"
                wrap="wrap"
              >
                {name===enemy.name ? <Avatar src={enemy.image} bg="#585497" radius="xl" size="md" style={{border: "white 2px solid", top:0}} /> : ""}
                <div style={{maxWidth: "60%"}}>
                  <Group position={name===mySide.name ? "right" : "left"}>
                    <Text color="white" size="xs">
                      {name}
                    </Text>
                  </Group>
                  
                  <Paper p="xs" bg="white" style={{wordWrap: "break-word", overflowWrap: "break-word"}}>
                  <Text color="#191736" size="xs" weight="bold">
                    {message}
                  </Text>
                </Paper>
                </div>
                {name===mySide.name ? <Avatar src={mySide.image} bg="#585497" radius="xl" size="md" style={{border: "white 2px solid", top:0}} /> : ""}
              </Flex>
            )})}

          </ScrollArea>
        </Paper>

        <Flex
          mt="lg"
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <form >
            <TextInput
              color="#585497"
              radius="lg"
              placeholder="メッセージを入力"
              

          />
          </form>
          <Button radius="lg" bg="#585497" color="violet"><IconBrandTelegram size="1rem" /></Button>
        </Flex>
      </Container>
      
    </div>
  )
}
