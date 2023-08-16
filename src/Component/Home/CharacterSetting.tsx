import React, {useState} from 'react'
import { SimpleGrid, UnstyledButton, ThemeIcon, rem, Text, Group, createStyles, getStylesRef, Image, LoadingOverlay, PinInput, Button, Container, Divider  } from '@mantine/core';
import {
  useViewportSize,
  
} from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { setPlayerData } from '../../Config/firebase'



const useStyles = createStyles((theme) => ({
  character: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  characterActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  }
}));

const mockdata = [
  {
    value: 'ninja',
    title: '忍者',
    description: '相手の思考を一回だけ無効にする「ドロン」が使える',
  },
  {
    value: 'clown',
    title: 'ピエロ',
    description: '自分の数字のうち、1桁だけ入れ替えることができる「ジャグリング」が使える',
  },
  {
    value: 'egyptian_god',
    title: 'エジプト神',
    description: '相手のどこかの桁の数字を知ることができる「ホルスの視線」が使える',
  },
  {
    value: 'aladdin',
    title: 'ランプの魔人',
    description: '考える時間を30秒延長させてくれる「ランプの魔法」が使える ',
  },
  {
    value: 'tanuki',
    title: 'ポン助',
    description: '次のターンの相手の試行時間を15秒にする「ときとばし」が使える',
  },
];

export function CharacterSetting({userData, isHost, close}: any) {
  const [step, setStep] = useState(0);
  const { width } = useViewportSize();
  const { classes, cx } = useStyles();
  const [sending, setSending] = useState(false);
  const [active, setActive] = useState(mockdata[0].title);
  const nextStep = () => setStep((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setStep((current) => (current > 0 ? current - 1 : current));

  const form = useForm({
    initialValues: {
      character: "",
      number: 0,
    },
    validate: {
      character: (value) => (value === null ? 'キャラクターを選んでください': null),
      number: (value) => (value === null ? '値を設定してください': null),
    },
  });

  // データ送信関数
  async function submit(number: string, character: string){
    setSending(true);     // 送信中に決定ボタンを押せないようにローディングを表示
    setPlayerData(
      isHost,             // isHost
      userData[0].assign, // roomId
      userData[0].uuid,   // uuid
      number,             // number
      character,          // character
      userData[0].name,   // name
      userData[0].level,  // level
      userData[0].win,    // win
      userData[0].lose,   // lose
    );
    setSending(false);    // ローディングを非表示
    close();
  }

  const links = mockdata.map((item, index) => (
    <UnstyledButton key={item.value} onClick={()=> {form.setFieldValue("character", item.value);  setActive(item.value);}} className={cx(classes.character, { [classes.characterActive]: item.value === active})}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={rem(45)} variant="default" radius="md" sx={{overflow: "hidden"}} bg="#FFF9DB" >
          <Image src={'./images/character/'+ item.value +'.png'} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  
  return (
    <form onSubmit={form.onSubmit((values) => { submit(String(values.number), String(values.character)); })}>
      <LoadingOverlay visible={sending} overlayBlur={2} />
      {step === 0 && 
      <>
        <Text mb="sm" ml="md">キャラクターを選択してください</Text>
        <Divider mb="xl" />
        <Container size="xs">
          
          <SimpleGrid cols={width > 750 ? 2 : 1}>
            {links}
          </SimpleGrid>
        </Container>
      </>
      }
      {step === 1 && 
      <>
        <Text mb="sm" ml="md">対戦番号を決めてください</Text>
        <Divider mb="xl" />
        <Container size="xs">
        <Group position="center">
          <PinInput inputType="tel" m="xl" inputMode="numeric" {...form.getInputProps('number')}/>
        </Group>
        </Container>
      </>
      }
      <Group position="right" mt="xl">
          {step === 0 && 
            <>
              <Button variant="default" onClick={close}>閉じる</Button>
              <Button onClick={nextStep}>次へ</Button>
            </>
          }
          {step === 1 && 
            <>
              <Button variant="default" onClick={prevStep}>戻る</Button>
              <Button type="submit">準備完了</Button>
            </>
          }
      </Group>
    </form>
  )
}
