import React, {useState} from 'react'
import '../../css/panel.css'
import '../../css/button.css'
import '../../css/badge.css'
import { 
  Group, 
  Container,
  ScrollArea,
  Text,
  Image,
  Badge,
  AspectRatio,
  Title,
  Center,
  Paper,
  Divider, 
} from '@mantine/core';
import { Carousel, useAnimationOffsetEffect, Embla } from '@mantine/carousel';
import { 
  IconCirclePlus,
} from '@tabler/icons-react';

export function CharacterSelect({height}: any) {
  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState<Embla | null>(null);

  useAnimationOffsetEffect(embla, TRANSITION_DURATION);
  return (
    <div className="panel panel-shadow panel-border" style={{height: height }}>
      <Group position="apart" px="sm" pt="sm" >
        <Badge size="lg" className="badge">キャラクター</Badge>
      </Group>

      <ScrollArea>

      <Container pt="xl">
        <Carousel
          mt="xl"
          controlsOffset="xs"
          loop 
          getEmblaApi={setEmbla} 
          maw={380}
          mx="auto"
          height={height/12*5}
          mb="xl"
        >
          <Carousel.Slide>
            <Center>
              <AspectRatio ratio={500/500} h={height/12*5} w={height/12*5}>
                <Image src="./images/akamaru.png" className="mainCharacter" />
              </AspectRatio>
            </Center>
          </Carousel.Slide>
          <Carousel.Slide>
            <Center>
              <AspectRatio ratio={500/500} h={height/12*5} w={height/12*5}>
                <Image src="./images/nekoninja.png" className="mainCharacter" />
              </AspectRatio>
            </Center>
          </Carousel.Slide>
          <Carousel.Slide>
            <Center>
              <AspectRatio ratio={500/500} h={height/12*5} w={height/12*5}>
                <Image src="./images/dragon.png" className="mainCharacter" />
              </AspectRatio>
            </Center>
          </Carousel.Slide>
          <Carousel.Slide>
            <Center>
              <AspectRatio ratio={500/500} h={height/12*5} w={height/12*5}>
                <Image src="./images/robot.png" className="mainCharacter" />
              </AspectRatio>
            </Center>
          </Carousel.Slide>
          <Carousel.Slide>
            <Center>
              <AspectRatio ratio={500/500} h={height/12*5} w={height/12*5}>
                <Image src="./images/nezumighost.png" className="mainCharacter" />
              </AspectRatio>
            </Center>
          </Carousel.Slide>
          <Carousel.Slide>
            <Center>
              <AspectRatio ratio={500/500} h={height/12*5} w={height/12*5}>
                <Image src="./images/mizu.png" className="mainCharacter" />
              </AspectRatio>
            </Center>
          </Carousel.Slide>
      </Carousel>
      <Paper className="panel-gray" radius="md"  w="100%" px="xl" py="md" mt="xl">
        <Title w="100%" size="h5" weight="bold" >キャラクター名</Title>
        <Divider mb="sm" />
        <Text size="sm">キャラクターの説明...</Text>
          
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
