import React, {useState} from 'react'
import '../../css/panel.css'
import '../../css/button.css'
import '../../css/badge.css'
import '../../css/guest.css'
import { addRoom } from '../../Config/firebase'
import { 
  Group, 
  Container,
  ScrollArea,
  useMantineTheme,
  Button,
  Badge,
  px,
  Avatar,
  Flex,
  Title,
  Text,
  rem,
  PinInput,
  Center,
  Select,
  NumberInput,
  Tooltip,
  ThemeIcon
} from '@mantine/core';
import { 
  useDisclosure, 
  useId,
  useViewportSize
} from '@mantine/hooks';
import { 
  IconRotate,
  IconPlayerPlayFilled,
  IconArrowBadgeRightFilled,
  IconQuestionMark
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';




export function Guest({userData, height}:any) {
  const [sending, setSending] = useState(false);
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      character: null,
      effect: 'true',
      timeLimit: 60,
      number: 0,
    },

    validate: {
      character: (value) => (value === null ? 'キャラクターを選んでください': null),
      timeLimit: (value) => (value < 10 || value > 120 ? '設定可能な制限時間は10～120秒です': null),
      number: (value) => (value === null ? '値を設定してください': null),
    },
  });

  async function submit(uuid: string, num: number, timeLimits: number, effects: boolean, name:string, level:number, win:number, lose:number, character: string){
    setSending(true);     // 送信中に決定ボタンを押せないようにローディングを表示
    const roomId = await addRoom(uuid, num, timeLimits, effects, name, level, win, lose, character );  // firebaseにデータを追加
    window.location.href = "/room/"+roomId;
    setSending(false);    // ローディングを非表示
  }

  return (
    <div className="panel panel-shadow panel-border bg-guest" style={{width: "100%", height: height,  zIndex:10}}>
      <Container>
      <form onSubmit={form.onSubmit((values) => {  submit(String(userData[0].uuid), Number(values.number), Number(values.timeLimit), Boolean(values.effect), String(userData[0].name), Number(userData[0].level), Number(userData[0].win), Number(userData[0].lose), String(values.character)); })}>
        <Badge variant="filled" color="dark" mt="sm" mb="xs">
            プレイヤー2
        </Badge>
        <ScrollArea h={5*px(height)/9} type="never">
        <Flex
          direction={{ base: 'column', xs: 'row' }}
          gap="md"
          justify={{ xs: 'center' }}
        >
            <Center h={5*px(height)/9}>
                <Avatar radius="1000px"  size={8*px(height)/11} src="./images/test_player.png"  p="sm" />
            </Center>
            <Center h={5*px(height)/9}>
              <div>
              <Group>
                <Group  position='apart'>
                <Text fz="sm" c="dark" weight="800">
                  ■ レベル:
                </Text>
                <Text fz="sm" c="dark" weight="800">120</Text>
                </Group>
              </Group>

              <Group>
                <Group position='apart'>
                <Text fz="sm" c="dark" weight="800">■ 戦績:</Text>
                <Text fz="sm" c="dark" weight="800">1.285</Text>
                </Group>
              </Group>
              </div>
            </Center>
        </Flex>
              

          
        </ScrollArea>
        <Group position="right">
          <Badge variant="filled" color="dark">
            Ready !
          </Badge>
        </Group>
      </form>
      </Container>
    </div>
  )
}
