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
  Title,
  PinInput,
  Center,
  Select,
  NumberInput,
  Tooltip,
  ThemeIcon
} from '@mantine/core';
import { 
  useDisclosure, 
  useId 
} from '@mantine/hooks';
import { 
  IconRotate,
  IconPlayerPlayFilled,
  IconQuestionMark
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';




export function GameSetting({height, userData}:any) {
  const theme = useMantineTheme();
  const MAIN_HEIGHT= height * 3  + px(theme.spacing.md);
  const [opened, { toggle }] = useDisclosure(false);
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

  async function submit(uuid: string, num: number, timeLimits: number, effects: boolean){
    setSending(true);     // 送信中に決定ボタンを押せないようにローディングを表示
    const roomId = await addRoom(uuid, num, timeLimits, effects);  // firebaseにデータを追加
    window.location.href = "/room/"+roomId;
    setSending(false);    // ローディングを非表示
  }

  return (
    <div className="panel panel-shadow panel-border" style={{height: MAIN_HEIGHT }}>
      <Group position="apart" px="sm" pt="sm" >
        <Badge className="badge" size="lg" >ゲームの設定</Badge>
      </Group>

      <Container pt="xl" >
      <form onSubmit={form.onSubmit((values) => {  submit(String(userData[0].uuid), Number(values.number), Number(values.timeLimit), Boolean(values.effect)); })}>
        <ScrollArea>
          <Center>
          <Group position="apart" mb="xl" mt="xl" w="80%">
          <Title w="50%" order={6} size="h4" weight="bold" >
            キャラクター
            <Tooltip
              label="ゲームに利用するキャラクターを選択しよう"
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
              {...form.getInputProps('character')}
              w="40%"
              data={[
                { value: 'あかまる', label: 'あかまる' },
                { value: 'キャラクター2', label: 'キャラクター2' },
                { value: 'キャラクター3', label: 'キャラクター3' }
              ]}/>
          </Group>
          </Center>

          <Center>
            <Group position="apart" mb="xl" mt="xl" w="80%">
              
                <Title w="50%" order={6} size="h4" weight="bold" >
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
                {...form.getInputProps('effect')}
                w="40%"
                data={[
                  { value: 'true', label: 'あり' },
                  { value: 'false', label: 'なし' },
              ]}/>
            </Group>
          </Center>


          <Center>
          <Group position="apart" mb="xl" mt="xl" w="80%">
          <Title w="50%" order={6} size="h4" weight="bold" >
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
              {...form.getInputProps('timeLimit')}
              w="40%"
              defaultValue={60}
            />
          </Group>
          </Center>
          <Center mb="lg">
          <Group position="apart" mb="xl" mt="xl" w="80%">
            <Title w="40%" order={6} size="h4" weight="bold" >
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
            <Group position="right" w="40%">
              <PinInput {...form.getInputProps('number')} color="yellow" size="md" type="number"  />
            </Group>
          </Group>
          </Center>
        </ScrollArea>
        <Center>
        <Group position="center" grow  mt="xl" w="80%">
            <Button onClick={() => form.reset()} disabled={sending} color="yellow" className="button" variant="white"><IconRotate style={{marginRight: theme.spacing.xs}} size="1rem"/>リセット</Button>
            <Button type="submit" loading={sending} color="yellow" className="button" ><IconPlayerPlayFilled style={{marginRight: theme.spacing.xs}} size="1.3rem"/>ゲーム開始</Button>
        </Group>
        </Center>
      </form>
      </Container>
      
    </div>
  )
}
