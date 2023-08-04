import React, {useState} from 'react'
import '../../css/panel.css'
import '../../css/button.css'
import '../../css/badge.css'
import { addRoom } from '../../Config/firebase'
import { 
  Group, 
  Container,
  ScrollArea,
  useMantineTheme,
  Button,
  Badge,
  px,
  Flex,
  Title,
  rem,
  PinInput,
  Center,
  Select,
  NumberInput,
  Tooltip,
  Paper,
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
  IconQuestionMark
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';




export function GameSetting({userData, height}:any) {
  const { width } = useViewportSize();
  const theme = useMantineTheme();
  const [sending, setSending] = useState(false);
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
    <div className="panel panel-shadow panel-border" style={{height: height, width: "100%"}}>
      <Group position="apart" px="sm" pt="sm" >
        <Badge className="badge" size="lg" >ゲームの設定</Badge>
      </Group>

      <Container mb="xl" >
      <form onSubmit={form.onSubmit((values) => {  submit(String(userData[0].uuid), Number(values.number), Number(values.timeLimit), Boolean(values.effect), String(userData[0].name), Number(userData[0].level), Number(userData[0].win), Number(userData[0].lose), String(values.character)); })}>
        <ScrollArea my="lg" >
          {/*<Center>
            <Flex
              w={ width > 800 ? "90%" : "100%" }
              mih={50}
              my="xs"
              gap={ width > 800 ? "md" : "none" }
              justify="center"
              align="center"
              direction={ width > 800 ? "row" : "column" }
              wrap="wrap"
            >
              <Title w={width > 800 ? "50%" : "100%"} size="h6" weight="bold" >
                キャラクター
                <Tooltip
                  label="ゲームに利用するキャラクターを選択しよう"
                  color="dark"
                  withArrow
                  w={"15em"}
                  multiline
                >
                  <ThemeIcon variant="outline" ml="md" radius="xl" size="xs" color="gray">
                    <IconQuestionMark />
                  </ThemeIcon>
                </Tooltip>
              </Title>
              <Select 
                size="md"
                {...form.getInputProps('character')}
                w={width > 800 ? "40%" : "100%"}
                data={[
                  { value: 'akamru', label: 'あかまる' },
                  { value: 'nekoninja', label: 'キャラクター2' },
                  { value: 'キャラクター3', label: 'キャラクター3' }
                ]}
              />
            </Flex>
          </Center>
          */}
          
          <Center>
            <Flex
              w={ width > 800 ? "90%" : "100%" }
              mih={50}
              my="xs"
              gap={ width > 800 ? "md" : "none" }
              justify="center"
              align="center"
              direction={ width > 800 ? "row" : "column" }
              wrap="wrap"
            >
              <Title w={width > 800 ? "50%" : "100%"}  size="h6" weight="bold" >
                特殊効果
                <Tooltip
                  label="ゲーム内で特殊効果が使えるかどうかを設定しよう"
                  color="dark"
                  withArrow
                  w={"15em"}
                  multiline
                >
                  <ThemeIcon variant="outline" ml="xs" radius="xl" size="xs" color="gray">
                    <IconQuestionMark />
                  </ThemeIcon>
                </Tooltip>
              </Title>
              <Select 
                size="md"
                {...form.getInputProps('effect')}
                w={width > 800 ? "40%" : "100%"}
                data={[
                  { value: 'true', label: 'あり' },
                  { value: 'false', label: 'なし' },
              ]}/>
            </Flex>
          </Center>


          <Center>
            <Flex
              w={ width > 800 ? "90%" : "100%" }
              mih={50}
              my="xs"
              gap={ width > 800 ? "md" : "none" }
              justify="center"
              align="center"
              direction={ width > 800 ? "row" : "column" }
              wrap="wrap"
            >
              <Title w={width > 800 ? "50%" : "100%"}  size="h6" weight="bold" >
                特殊効果の数
                <Tooltip
                  label="1ターンの時間を設定しよう(10～120秒)"
                  color="dark"
                  withArrow
                  w={"15em"}
                  multiline
                >
                  <ThemeIcon variant="outline" ml="xs" radius="xl" size="xs" color="gray">
                    <IconQuestionMark />
                  </ThemeIcon>
                </Tooltip>
              </Title>
              <NumberInput
                size="md"
                {...form.getInputProps('timeLimit')}
                w={width > 800 ? "40%" : "100%"}
                defaultValue={60}
              />
            </Flex>
          </Center>


          <Center>
            <Flex
              w={ width > 800 ? "90%" : "100%" }
              mih={50}
              my="xs"
              gap={ width > 800 ? "md" : "none" }
              justify="center"
              align="center"
              direction={ width > 800 ? "row" : "column" }
              wrap="wrap"
            >
              <Title w={width > 800 ? "50%" : "100%"}  size="h6" weight="bold" >
                制限時間
                <Tooltip
                  label="1ターンの時間を設定しよう(10～120秒)"
                  color="dark"
                  withArrow
                  w={"15em"}
                  multiline
                >
                  <ThemeIcon variant="outline" ml="xs" radius="xl" size="xs" color="gray">
                    <IconQuestionMark />
                  </ThemeIcon>
                </Tooltip>
              </Title>
              <NumberInput
                size="md"
                {...form.getInputProps('timeLimit')}
                w={width > 800 ? "40%" : "100%"}
                defaultValue={60}
              />
            </Flex>
          </Center>


          
          
          {/*
          <Center mb="lg">
            <Flex
              w={ width > 800 ? "90%" : "100%" }
              mih={50}
              gap={ width > 800 ? "md" : "none" }
              justify="center"
              align="center"
              my="xs"
              direction={ width > 800 ? "row" : "column" }
              wrap="wrap"
            >
              
              <Title w={width > 800 ? "50%" : "100%"}  size="h6" weight="bold" >
                対戦番号
                <Tooltip
                  label="相手に推理されないような4桁の番号を選ぼう"
                  color="dark"
                  withArrow
                  w={"15em"}
                  multiline
                >
                  <ThemeIcon variant="outline" ml="xs" radius="xl" size="xs" color="gray">
                    <IconQuestionMark />
                  </ThemeIcon>
                </Tooltip>
              </Title>
              <Group position="right" w={width > 800 ? "40%" : "100%"}>
                <Center>
                  <PinInput {...form.getInputProps('number')} color="yellow" w={"100%"} size="md" type="number"  />
                </Center>
              </Group>
            </Flex>
          </Center>
          */}
        </ScrollArea>
        <Center>
        <Group position="right"   mt="sm" w={ width > 800 ? "90%" : "100%" }>
            <Button onClick={() => form.reset()} disabled={sending} color="dark" className="button" variant="white"><IconRotate style={{marginRight: theme.spacing.xs}} size="1rem"/>リセット</Button>
        </Group>
        </Center>
      </form>
      </Container>
      
    </div>
  )
}
