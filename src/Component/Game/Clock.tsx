import React from 'react'
import { 
  Group, 
  Badge,
  ActionIcon,
  RingProgress,
  Text,
  Container,
  ScrollArea,
  px,
  useMantineTheme,
  Popover
} from '@mantine/core';
import { 
  IconDotsVertical,
} from '@tabler/icons-react';
import { useLocalStorage } from '@mantine/hooks';


export function Clock({height, time}: any) {
  const theme = useMantineTheme();
  const [timer, setTimer, removeTimer] = useLocalStorage({ key: 'time', defaultValue: '-' });


  return (
    <>
      <Group position="apart" px="sm" pt="sm" >
        <Badge size="sm" className="badge">残り時間</Badge>
        <Popover width={200} trapFocus position="top" shadow="md" >
          <Popover.Dropdown sx={{ pointerEvents: 'none',  border: "gray 1px solid"}} className="gray">
            <Text size="xs">制限時間が過ぎると無回答扱いになるよ！急いで！！</Text>
          </Popover.Dropdown>
          <Popover.Target>
            <ActionIcon variant="transparent"><IconDotsVertical size="20"/></ActionIcon>
          </Popover.Target>
        </Popover>
      </Group>

      <Container>
      <Group position="center" >
        <RingProgress
          
          mt={10}
          size={height/5*3}
          thickness={12}
          roundCaps
          label={
            <Text size="xl"  align="center" color="dark" weight={700}  sx={{ pointerEvents: 'none' }}>
              {timer}
            </Text>
          }
          sections={[
            { value: timer !== '-' ? Number(timer)/120*100 : 0, color: '#F8B723', tooltip: '残り時間 – ' + timer + '秒' },
          ]}
        />
      </Group>
      </Container>
    </>
  )
}
