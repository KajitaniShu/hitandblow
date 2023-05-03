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
import { IconClockHour3 } from '@tabler/icons-react';


export function ClockSP({height, roomData, messages}: any) {
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
    <Badge h={height} pr={"1.5em"} leftSection={<IconClockHour3 size={20} style={{paddingTop: 4}}/>} className="badge">{time >= 0 ? time : "-"}</Badge>
  )
}
