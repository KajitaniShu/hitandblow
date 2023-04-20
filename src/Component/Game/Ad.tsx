import React from 'react'
import { 
  Group, 
  Badge,
  ActionIcon,
  Popover,
  Text
} from '@mantine/core';
import { 
  IconDotsVertical,
} from '@tabler/icons-react';

export function Ad({height}: any) {
  const SECONDARY_TOP_HEIGHT = height;

  return (
      <Group position="apart" px="sm" pt="sm" >
        <Badge size="sm" className="badge">広告</Badge>
        <Popover width={200} trapFocus position="top" shadow="md" >
          <Popover.Dropdown sx={{ pointerEvents: 'none',  border: "gray 1px solid"}} className="gray">
            <Text size="xs">広告をここに載せてるよ．押し間違えたらごめんね...</Text>
          </Popover.Dropdown>
          <Popover.Target>
            <ActionIcon variant="transparent"><IconDotsVertical size="20"/></ActionIcon>
          </Popover.Target>
        </Popover>
      </Group>
  )
}
