import React from 'react'
import '../css/footer.css'

import { Footer, Flex, Text, rem, Group, AspectRatio, Image, px, Container }  from '@mantine/core'

export function Foot() {
  return (
    <div>
      <Container>
        <Group position="right" px="xl">
          <AspectRatio ratio={500/500} h={rem(100)} w={rem(100)} style={{bottom: -1* px(rem(22))}}>
            <Image src="./images/footer.png"/>
          </AspectRatio>
        </Group>
      </Container>
      <Footer height={rem(120)} bg="#FFC734" pt="sm" style={{borderTop: "2px solid black"}}>
        <Flex  gap="none" wrap="nowrap" direction="column" h={rem(90)} p="sm" align="center">
            <Flex  gap="md" wrap="nowrap" direction="row">
              <Text size="xs" weight="bolder" component='a' href="https://twitter.com/hiiragi_leaf">このゲームについて</Text>
              <Text size="xs" weight="bolder" component='a' href="https://twitter.com/hiiragi_leaf">お問い合わせ</Text>
              <Text size="xs" weight="bolder" component='a' href="/privacy">プライバシーポリシー</Text>
            </Flex>
            <Text size="xs" mt="md" weight="bolder">Hit&Blow.online</Text>
            <Text size="xs" weight="bolder">ひいらぎ All Rights Reserved.</Text>
        </Flex>
      </Footer>
    </div>
  )
}
