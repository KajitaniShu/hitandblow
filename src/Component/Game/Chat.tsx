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

export function Chat({mySide, enemy, messageList, messageForm, height}: any) {
  const theme = useMantineTheme();

  return (
      <Container pt="md">
        <Paper p="md"  h={height/7*5}  withBorder>
          <ScrollArea h={"100%"} type="scroll" scrollbarSize={6} offsetScrollbars>
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
                    <Text size="xs" weight="bold" color={theme.colors.gray[7]}>
                      {name}
                    </Text>
                  </Group>
                  
                  <Paper p="xs" bg="white" withBorder style={{wordWrap: "break-word", overflowWrap: "break-word"}}>
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
