import { useState, useEffect } from 'react'
import '../../css/panel.css'
import '../../css/button.css'
import '../../css/badge.css'
import { setRules } from '../../Config/firebase'
import { 
  Group, 
  Container,
  useMantineTheme,
  Button,
  Badge,
  Flex,
  Title,
  Text,
  Popover,
  Center,
  Select,
  NumberInput,
  ThemeIcon
} from '@mantine/core';
import {
  useViewportSize
} from '@mantine/hooks';
import { 
  IconRotate,
  IconCheck,
  IconQuestionMark
} from '@tabler/icons-react';
import { useForm, isInRange, isNotEmpty } from '@mantine/form';




export function GameSetting({roomData, userData, height}:any) {
  const { width } = useViewportSize();
  const theme = useMantineTheme();
  const [sending, setSending] = useState(false);
  const form = useForm({
    initialValues: {
      effect:    "true",
      timeLimit:     60,
      turns:       "-1",
    },

    validate: {
      effect: isNotEmpty(),
      turns: isNotEmpty(),
      timeLimit: isInRange({ min: 10, max: 120 }),
    },
  });

  useEffect(() => {
    if(roomData && roomData[0]) {
      console.log("aaa")
      form.setFieldValue('effect',    String(roomData[0].rule.effects));
      form.setFieldValue('timeLimit', roomData[0].rule.timeLimits);
      form.setFieldValue('turns',     String(roomData[0].rule.turns));
    }
  },[roomData])

  async function submit(timeLimit: number, turns: string, effect: string) {
    setSending(true);       // 送信中に決定ボタンを押せないようにローディングを表示
    setRules(
      userData[0].assign,   // roomId
      timeLimit,            // timeLimits
      Number(turns),        // turns
      effect,      // effects
    )
    setSending(false);    // ローディングを非表示
  }

  return (
    <div className="panel panel-shadow panel-border" style={{height: height, width: "100%"}}>
      <Container >
        <Badge variant="filled" color="dark" mt="sm" mb="xl" >
          ゲーム設定
        </Badge>

      <form onSubmit={form.onSubmit((values) => { submit(values.timeLimit, values.turns, values.effect); })}>
          <Center pb={ width > 750 ? "xs" : "none" }>
            <Flex
              w={ width > 750 ? "90%" : "100%" }
              mih={50}
              py="xs"
              gap={ width > 750 ? "md" : "none" }
              justify="center"
              align="center"
              direction={ width > 750 ? "row" : "column" }
              wrap="wrap"
            >
              <Title w={width > 750 ? "50%" : "100%"}  size="h6" weight="bold" >
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
                w={width > 750 ? "40%" : "100%"}
                data={[
                  { value: 'true',  label: 'あり' },
                  { value: 'false', label: 'なし' },
              ]}/>
            </Flex>
          </Center>


          <Center py={ width > 750 ? "xs" : "none" }>
            <Flex
              w={ width > 750 ? "90%" : "100%" }
              mih={50}
              py="xs"
              gap={ width > 750 ? "md" : "none" }
              justify="center"
              align="center"
              direction={ width > 750 ? "row" : "column" }
              wrap="wrap"
            >
              <Title w={width > 750 ? "50%" : "100%"}  size="h6" weight="bold" >
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
                styles={(theme) => ({
                  dropdown: {
                    overflow: "visible",
                    zIndex: 20,
                  }
                })}
                size="md"
                {...form.getInputProps('turns')}
                w={width > 750 ? "40%" : "100%"}
                data={[
                  { value: "-1", label: '無制限'},
                  { value: "10", label: '10' },
                  { value: "15", label: '15' },
              ]}/>
            </Flex>
          </Center>


          <Center pt={width > 750 ? "xs" : "none"} pb={ width > 750 ? "xs" : "md" }  >
            <Flex
              w={ width > 750 ? "90%" : "100%" }
              mih={50}
              py="xs"
              gap={ width > 750 ? "md" : "none" }
              justify="center"
              align="center"
              direction={ width > 750 ? "row" : "column" }
              wrap="wrap"
            >
              <Title w={width > 750 ? "50%" : "100%"}  size="h6" weight="bold" >
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
                w={width > 750 ? "40%" : "100%"}
              />
            </Flex>
          </Center>
        <Center>
        <Group position="right"   mt="sm" w={ width > 750 ? "90%" : "100%" }>
            <Button disabled={sending} onClick={() => {form.reset(); submit(60, "-1", "true")}} color="dark" variant="outline"><IconRotate style={{marginRight: theme.spacing.xs}} size="1rem"/>リセット</Button>
            <Button disabled={sending} type="submit" color="dark" variant="filled"><IconCheck style={{marginRight: theme.spacing.xs}} size="1rem"/>変更</Button>
        </Group>
        </Center>
      </form>
      </Container>
      
    </div>
  )
}
