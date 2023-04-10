import React from 'react'
import { 
  Group, 
  Container,
  ScrollArea,
  Text,
  useMantineTheme,
  Button,
  Flex,
  Image,
  Badge,
  ActionIcon,
  px,
  Progress,
  Box,
  AspectRatio,
  Title,
  PinInput,
  Tooltip,
  Center,
  Select,
  NumberInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconRotate,
  IconPlayerPlayFilled
} from '@tabler/icons-react';
import {
  AiOutlineUserSwitch
} from 'react-icons/ai'
import '../Scene/GameScene.css';

export function GameSetting({height}:any) {
  const theme = useMantineTheme();
  const MAIN_HEIGHT= height * 3  + px(theme.spacing.md);
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <div style={{backgroundColor:"#26254A", height: MAIN_HEIGHT, borderRadius: "8px", }}>
      <Group position="apart" px="sm" pt="sm" >
        <Badge size="lg" className="gray">ゲームの設定</Badge>
      </Group>


      <Container pt="xl" >
        <ScrollArea>
          <Center>
          <Group position="apart" mb="xl" mt="xl" w="80%">
            <Title w="40%" order={6} size="h3" weight="normal" color="white">対戦形式</Title>
            <Select 
              variant="filled"
              w="50%"
              data={[
                { value: '練習', label: '練習' },
                { value: 'ランクマッチ', label: 'ランクマッチ' },
              ]}/>
          </Group>
          </Center>
          <Center>
          <Group position="apart" mb="xl" mt="xl" w="80%">
            <Title w="40%" order={6} size="h3" weight="normal" color="white">特殊効果</Title>
            <Select 
              variant="filled"
              w="50%"
              data={[
                { value: 'あり', label: 'あり' },
                { value: 'なし', label: 'なし' },
              ]}/>
          </Group>
          </Center>
          <Center>
          <Group position="apart" mb="xl" mt="xl" w="80%">
            <Title w="40%" order={6} size="h3" weight="normal" color="white">制限時間</Title>
            <NumberInput
              w="50%"
              defaultValue={60}
              placeholder="Your age"
            />
          </Group>
          </Center>
          <Center mb="lg">
          <Group position="apart" mb="xl" mt="xl" w="80%">
            <Title w="40%" order={6} size="h3" weight="normal" color="white">対戦番号</Title>
            <Group position="right" w="50%">
              <PinInput  color="yellow" size="md" type="number"  />
            </Group>
          </Group>
          </Center>
        </ScrollArea>
        <Center>
        <Group position="center" grow  mt="xl" w="80%">
            <Button color="yellow" variant="white"><IconRotate style={{marginRight: theme.spacing.xs}} size="1rem"/>リセット</Button>
            <Button color="yellow" variant="filled"><IconPlayerPlayFilled style={{marginRight: theme.spacing.xs}} size="1.3rem"/>ゲーム開始</Button>
        </Group>
        </Center>
        
      </Container>
      
    </div>
  )
}
