import React, { useState, useEffect } from 'react'
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
import { useInterval } from '@mantine/hooks';
import {format} from 'date-fns'


export function Clock({height, roomData, messages}: any) {
  const theme = useMantineTheme();
  const [seconds, setSeconds] = useState(0);
  var predicts = messages.filter( function(value: any) { return value.type === "predict"; })
  const time = 60 - Math.floor((Date.now() - predicts[predicts.length-1].update.toDate())/1000);
  
  
  const interval = useInterval(() => { 
    //if(seconds > 0) setSeconds((s) => s - 1);
    const time = Math.floor((Date.now() - messages[messages.length-1].update.toDate())/1000)+60;
    if(time > 0) setSeconds(Number(time));
  }, 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  });

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
              {//seconds > 0 ? seconds : "-"
              time >= 0 ? time : "-"
              }
            </Text>
          }
          sections={[
            { value: time >= 0 ? Number(time)/60*100 : 0, color: '#F8B723', tooltip: '残り時間 – ' + seconds + '秒' },
          ]}
        />
      </Group>
      </Container>
    </>
  )
}
