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

export function Clock({height, time}: any) {
  const SECONDARY_TOP_HEIGHT = height;
  const theme = useMantineTheme();

  return (
    <div style={{backgroundColor:"#26254A", height: SECONDARY_TOP_HEIGHT, borderRadius: "8px" }}>
      <Group position="apart" px="sm" pt="sm" >
        <Badge size="sm" className="gray">残り時間</Badge>
        <Popover width={200} trapFocus position="top" shadow="md" >
          <Popover.Dropdown sx={{ pointerEvents: 'none',  border: "gray 1px solid"}} className="gray">
            <Text size="xs">制限時間が過ぎると無回答扱いになるよ！急いで！！</Text>
          </Popover.Dropdown>
          <Popover.Target>
            <ActionIcon variant="transparent"><IconDotsVertical size="20"/></ActionIcon>
          </Popover.Target>
        </Popover>
      </Group>
      <ScrollArea h={SECONDARY_TOP_HEIGHT-px(theme.spacing.md)} >

      <Container>
      <Group position="center" >
        <RingProgress
          mt={10}
          size={100}
          thickness={10}
          roundCaps
          label={
            <Text size="lg"  align="center" color="white"  sx={{ pointerEvents: 'none' }}>
              {time}
            </Text>
          }
          sections={[
            { value: time, color: '#F8B723', tooltip: '残り時間 – ' + time + '秒' },
          ]}
        />
      </Group>
      </Container>
      </ScrollArea>
    </div>
  )
}
