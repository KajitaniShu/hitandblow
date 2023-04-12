import React from 'react'
import '../../css/panel.css'
import '../../css/button.css'
import '../../css/badge.css'
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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconRotate,
  IconPlayerPlayFilled
} from '@tabler/icons-react';

export function GameSetting({height}:any) {
  const theme = useMantineTheme();
  const MAIN_HEIGHT= height * 3  + px(theme.spacing.md);
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <div className="panel panel-shadow panel-border" style={{height: MAIN_HEIGHT }}>
      <Group position="apart" px="sm" pt="sm" >
        <Badge className="badge" size="lg" >ゲームの設定</Badge>
      </Group>

      <Container pt="xl" >
        <ScrollArea>
          <Center>
          <Group position="apart" mb="xl" mt="xl" w="80%">
          <Title w="40%" order={6} size="h4" weight="bold" >対戦形式</Title>
            <Select 
              w="50%"
              data={[
                { value: '練習', label: '練習' },
                { value: 'ランクマッチ', label: 'ランクマッチ' },
              ]}/>
          </Group>
          </Center>
          <Center>
          <Group position="apart" mb="xl" mt="xl" w="80%">
          <Title w="40%" order={6} size="h4" weight="bold" >特殊効果</Title>
            <Select 
              w="50%"
              data={[
                { value: 'あり', label: 'あり' },
                { value: 'なし', label: 'なし' },
              ]}/>
          </Group>
          </Center>
          <Center>
          <Group position="apart" mb="xl" mt="xl" w="80%">
          <Title w="40%" order={6} size="h4" weight="bold" >制限時間</Title>
            <NumberInput
              w="50%"
              defaultValue={60}
            />
          </Group>
          </Center>
          <Center mb="lg">
          <Group position="apart" mb="xl" mt="xl" w="80%">
            <Title w="40%" order={6} size="h4" weight="bold" >対戦番号</Title>
            <Group position="right" w="50%">
              <PinInput color="yellow" size="md" type="number"  />
            </Group>
          </Group>
          </Center>
        </ScrollArea>
        <Center>
        <Group position="center" grow  mt="xl" w="80%">
            <Button color="yellow" className="button" variant="white"><IconRotate style={{marginRight: theme.spacing.xs}} size="1rem"/>リセット</Button>
            <Button color="yellow" className="button" ><IconPlayerPlayFilled style={{marginRight: theme.spacing.xs}} size="1.3rem"/>ゲーム開始</Button>
        </Group>
        </Center>
        
      </Container>
      
    </div>
  )
}
