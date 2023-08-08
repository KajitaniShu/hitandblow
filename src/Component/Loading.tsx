import React from 'react'
import { Loader, Flex, Text } from '@mantine/core'
import { useViewportSize  } from '@mantine/hooks';


export function Loading() {
  const { width, height } = useViewportSize();
  return (
    <Flex
      h={height}
      gap="md"
      justify="center"
      align="center"
      direction="column"
      wrap="nowrap"
    >
      
      <Loader color="violet" size="lg" variant="bars" />
      <Text color="dark" >読み込み中...</Text>
    </Flex>
  );
}
