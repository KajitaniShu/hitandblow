import React, {useState} from 'react'
import '../../css/panel.css'
import '../../css/button.css'
import '../../css/badge.css'
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
  Paper,
  Divider, 
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Carousel, useAnimationOffsetEffect, Embla } from '@mantine/carousel';
import { 
  IconCirclePlus,
  IconBrandTelegram,
  IconArrowRight,
  IconArrowLeft
} from '@tabler/icons-react';
import {
  AiOutlineUserSwitch
} from 'react-icons/ai'

export function CharacterSelect({height}:any) {
  const theme = useMantineTheme();
  const MAIN_HEIGHT= height * 3  + px(theme.spacing.md);
  const TRANSITION_DURATION = 200;
  const [opened, setOpened] = useState(false);
  const [embla, setEmbla] = useState<Embla | null>(null);

  useAnimationOffsetEffect(embla, TRANSITION_DURATION);
  return (
    <div className="panel panel-shadow panel-border" style={{height: MAIN_HEIGHT }}>
      <Group position="apart" px="sm" pt="sm" >
        <Badge size="lg" className="badge">キャラクター</Badge>
      </Group>

      <ScrollArea>

      <Container pt="md">
        <Carousel
          mt="xl"
          controlsOffset="xs"
          loop 
          getEmblaApi={setEmbla} 
          maw={380}
          mx="auto"
          height={MAIN_HEIGHT/7*3}
          w={"100%"}
          mb="xl"
        >
          <Carousel.Slide>
            <Center>
              <AspectRatio ratio={500/500} w={MAIN_HEIGHT/7*3}>
                <Image src="./images/akamaru.png" className="mainCharacter" />
              </AspectRatio>
            </Center>
          </Carousel.Slide>
          <Carousel.Slide>
            <Center>
              <AspectRatio ratio={500/500} w={MAIN_HEIGHT/7*3}>
                <Image src="./images/akamaru.png" className="mainCharacter" />
              </AspectRatio>
            </Center>
          </Carousel.Slide>
          <Carousel.Slide>
            <Center>
              <AspectRatio ratio={500/500} w={MAIN_HEIGHT/7*3}>
                <Image src="./images/akamaru.png" className="mainCharacter" />
              </AspectRatio>
            </Center>
          </Carousel.Slide>
      </Carousel>
      <Paper className="panel-gray" radius="md"  mx="auto" w="90%" px="xl" py="md" mt="xl">
        <Title w="40%" order={6} size="h4" weight="bold" >あかまる</Title>
        <Divider mb="sm" />
        <Text size="sm">鬼一族の中でも最も勇敢な鬼として知られている．</Text>
          
            <Group mt="xl">
              <ScrollArea>
                <Badge pl="xs" leftSection={<IconCirclePlus style={{marginTop:"5"}} size="16"/>} className="badge-yellow" size="md" mr="sm" >プラスフラッシュ</Badge>
                <Badge pl="xs" leftSection={<IconCirclePlus style={{marginTop:"5"}} size="16"/>} className="badge-yellow" size="md" mr="sm"  >プラスフラッシュ</Badge>
              </ScrollArea>
            </Group>
      </Paper>
          
      </Container>
      </ScrollArea>
      
    </div>
  )
}
