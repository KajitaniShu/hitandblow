import React from 'react'
import '../css/footer.css'

import { Footer, Flex, Text, rem, Group, AspectRatio, Image, px, Container, useMantineTheme }  from '@mantine/core'

export function Foot() {
  const theme = useMantineTheme();

  return (
    <div>
      <Container>
        <Group position="right" px="xl">
          <AspectRatio ratio={500/500} h={rem(100)} w={rem(100)} style={{bottom: -1* px(rem(22))}}>
            <Image src="./images/footer.png"/>
          </AspectRatio>
        </Group>
      </Container>
      <Footer height={rem(120)} bg={theme.colors.yellow[4]} pt="sm" style={{borderTop: "2px solid black"}}>
        <Flex  gap="none" wrap="nowrap" direction="column" h={rem(90)} p="sm" align="center">
            <Flex  gap="md" wrap="nowrap" direction="row">
              <Text size="xs" sx={{color: "black"}} weight="bolder" component='a' href="https://twitter.com/hiiragi_leaf">このゲームについて</Text>
              <Text size="xs" sx={{color: "black"}} weight="bolder" component='a' href="https://twitter.com/hiiragi_leaf">お問い合わせ</Text>
              <Text size="xs" sx={{color: "black"}} weight="bolder" component='a' href="/privacy">プライバシーポリシー</Text>
            </Flex>
            <Text size="xs" mt="md" sx={{color: "black"}} weight="bolder">Hit&Blow.online</Text>
            <Text size="xs" sx={{color: "black"}} weight="bolder">ひいらぎ All Rights Reserved.</Text>
        </Flex>
      </Footer>
    </div>
  )
}
