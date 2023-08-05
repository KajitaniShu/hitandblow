import React from 'react'
import { Flex, Group, Text, Image, rem, AspectRatio, Footer, px, Center } from '@mantine/core'
import { useViewportSize  } from '@mantine/hooks';
import SignInWithGoogle from './SignInWithGoogle';
import SignInWithAnonymous from './SignInWithAnonymous';


export function Admin() {
  const { width, height } = useViewportSize();

  return (
    <>
    <Flex
      h={height-px(rem(120))}
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
        <div className="panel" style={{width: rem(400), zIndex:10}}>
          <Flex  gap="xl" wrap="nowrap" direction="column"align="center" py={rem(40)}>
            <SignInWithGoogle w={rem(250)}/>
            <SignInWithAnonymous w={rem(250)}/>
          </Flex>
        </div>
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
    <Footer height={rem(120)} bg="yellow" pt="sm" style={{borderTop: "2px solid black"}}>
      <Flex  gap="none" wrap="nowrap" direction="column" h={rem(90)} p="sm" align="center">
          <Flex  gap="md" wrap="nowrap" direction="row">
            <Text size="xs" weight="bolder">このゲームについて</Text>
            <Text size="xs" weight="bolder">お問い合わせ</Text>
            <Text size="xs" weight="bolder">プライバシーポリシー</Text>
          </Flex>
          <Text size="xs" mt="md" weight="bolder">Hit&Blow.online</Text>
          <Text size="xs" weight="bolder">ひいらぎ All Rights Reserved.</Text>
      </Flex>
    </Footer>
    </>
  );
}