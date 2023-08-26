import React from 'react'
import { Flex, Group, Text, Image, rem, AspectRatio, px, Paper, useMantineTheme } from '@mantine/core'
import { useViewportSize  } from '@mantine/hooks';
import SignInWithGoogle from './SignInWithGoogle';
import SignInWithAnonymous from './SignInWithAnonymous';
import { Foot } from '../Component/Foot'
import '../css/admin.css'

export function Admin() {
  const { width, height } = useViewportSize();
  const theme = useMantineTheme();

  return (
    <>
      <Flex
        mih={height-px(rem(200))}
        gap="none"
        justify="center"
        align="center"
        direction="column"
        wrap="nowrap"
        >
        {width > px(rem(400)) ?
          <>
          <Group position='apart' w={width > px(rem(400)) ? rem(340) : "80%"}>
            <Flex  gap="none" wrap="nowrap" direction="column" mb="xs">
              <Text size={rem(50)} weight="bolder" style={{lineHeight: "1em"}}>Hit&Blow</Text>
              <Group position='right'><Text size={rem(30)} weight="bolder" style={{lineHeight: "1em"}}>online</Text></Group>
            </Flex>
            <AspectRatio ratio={500/500} h={rem(70)} w={rem(70)} style={{bottom: "-15px"}}>
              <Image src="./images/title.png"/>
            </AspectRatio>
          </Group>
          <Paper pt={rem(8)} shadow="sm" style={{width: rem(380), zIndex:10}} radius="md" sx={{border: theme.colorScheme === "dark" ? "1px solid #5C5F66": "2px solid black"}}>
            <Flex  gap="xl" wrap="nowrap" direction="column"align="center" py={rem(40)}>
              <SignInWithGoogle w={rem(250)}/>
              <SignInWithAnonymous w={rem(250)}/>
            </Flex>
          </Paper>
          </>
          :
          <>
          <Group position='center' w={width > px(rem(400)) ? rem(340) : "80%"}>
            <Flex  gap="none" wrap="nowrap" direction="column" mb="xs">
              <Text size={rem(35)} weight="bolder" style={{lineHeight: "1em"}}>Hit&Blow</Text>
              <Group position='right'><Text size={rem(20)} weight="bolder" style={{lineHeight: "1em"}}>online</Text></Group>
            </Flex>
            <AspectRatio ratio={500/500} h={rem(70)} w={rem(70)} style={{bottom: "-5px"}}>
              <Image src="./images/title.png"/>
            </AspectRatio>
          </Group>
          <div className="panel" style={{width: "80%", zIndex:10}}>
            <Flex  gap="xl" wrap="nowrap" direction="column"align="center" py={rem(40)}>
              <SignInWithGoogle w={"80%"}/>
              <SignInWithAnonymous w={"80%"}/>
            </Flex>
          </div>
          </>
        }
      </Flex>
      <Foot />
      </>
  );
}