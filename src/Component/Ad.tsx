import React from 'react'
import { 
  Group, 
  Badge,
  ActionIcon
} from '@mantine/core';
import { 
  IconDotsVertical,
} from '@tabler/icons-react';

export function Ad({height}: any) {
  const SECONDARY_TOP_HEIGHT = height;

  return (
    <div style={{backgroundColor:"#26254A", height: SECONDARY_TOP_HEIGHT, borderRadius: "8px" }}>
      <Group position="apart" px="sm" pt="sm" >
        <Badge size="sm" className="gray">広告</Badge>
        <ActionIcon variant="transparent"><IconDotsVertical size="20"/></ActionIcon>
      </Group>
    </div>
  )
}
