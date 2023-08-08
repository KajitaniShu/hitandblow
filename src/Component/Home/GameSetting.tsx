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
  Text,
  PinInput,
  Popover,
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
  IconCheck,
  IconQuestionMark
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';




export function GameSetting({userData, height}:any) {
  const { width } = useViewportSize();
  const theme = useMantineTheme();
  const [sending, setSending] = useState(false);
  const form = useForm({
    initialValues: {
      effect: 'true',
      timeLimit: 60,
      turns: "無制限",
    },

    validate: {
      effect: (value) => (value === null ? '値を設定してください': null),
      turns:  (value) => (value === null ? '値を設定してください': null),
      timeLimit: (value) => (value < 10 || value > 120 ? '設定可能な制限時間は10～120秒です': null),
    },
  });

  async function submit(timeLimits: number, effects: boolean, turns:string, ){
    setSending(true);     // 送信中に決定ボタンを押せないようにローディングを表示
    // const 
    // const roomId = await addRoom(uuid, num, timeLimits, effects, name, level, win, lose, character );  // firebaseにデータを追加
    //window.location.href = "/room/"+roomId;
    setSending(false);    // ローディングを非表示
  }

  return (
    <div className="panel panel-shadow panel-border" style={{height: height, width: "100%"}}>
      <Container mb="xl" >
        <Badge variant="filled" color="dark" mt="sm" mb="xs">
          ゲーム設定
        </Badge>

      <form onSubmit={form.onSubmit((values) => {  submit(Number(values.timeLimit), Boolean(values.effect), String(userData[0].turns))})}>
        <ScrollArea my="lg" >
          
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
                <Popover width={"10em"} position="bottom" withArrow shadow="md">
                  <Popover.Target>
                    <ThemeIcon variant="outline" ml="xs" radius="xl" size="xs" color="gray">
                      <IconQuestionMark />
                    </ThemeIcon>
                  </Popover.Target>
                  <Popover.Dropdown bg="black" p="xs">
                    <Text size="xs" color="white">特殊効果を許可するかどうか決めよう ! </Text>
                  </Popover.Dropdown>
                </Popover>
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
                ターン数
                <Popover width={"10em"} position="bottom" withArrow shadow="md">
                  <Popover.Target>
                    <ThemeIcon variant="outline" ml="xs" radius="xl" size="xs" color="gray">
                      <IconQuestionMark />
                    </ThemeIcon>
                  </Popover.Target>
                  <Popover.Dropdown bg="black" p="xs">
                    <Text size="xs" color="white">ターン数を設定しよう ! </Text>
                  </Popover.Dropdown>
                </Popover>
              </Title>
              <Select 
                size="md"
                {...form.getInputProps('turns')}
                w={width > 800 ? "40%" : "100%"}
                data={[
                  { value: '5', label: '5' },
                  { value: '10', label: '10' },
                  { value: '15', label: '15' },
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
                制限時間
                <Popover width={"10em"} position="bottom" withArrow shadow="md">
                  <Popover.Target>
                    <ThemeIcon variant="outline" ml="xs" radius="xl" size="xs" color="gray">
                      <IconQuestionMark />
                    </ThemeIcon>
                  </Popover.Target>
                  <Popover.Dropdown bg="black" p="xs">
                    <Text size="xs" color="white">1ターンの時間を設定しよう ! (10～120秒)</Text>
                  </Popover.Dropdown>
                </Popover>
              </Title>
              <NumberInput
                size="md"
                {...form.getInputProps('timeLimit')}
                w={width > 800 ? "40%" : "100%"}
                defaultValue={60}
              />
            </Flex>
          </Center>

        </ScrollArea>
        <Center>
        <Group position="right"   mt="sm" w={ width > 800 ? "90%" : "100%" }>
            <Button onClick={() => form.reset()} disabled={sending} color="dark" variant="outline"><IconRotate style={{marginRight: theme.spacing.xs}} size="1rem"/>リセット</Button>
            <Button onClick={() => form.reset()} disabled={sending} color="dark" variant="filled"><IconCheck style={{marginRight: theme.spacing.xs}} size="1rem"/>変更</Button>
        </Group>
        </Center>
      </form>
      </Container>
      
    </div>
  )
}
