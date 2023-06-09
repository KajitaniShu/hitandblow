import React from 'react'
import { Flex } from '@mantine/core'
import { useViewportSize  } from '@mantine/hooks';
import SignInWithGoogle from './SignInWithGoogle';


export function Admin() {
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
      <SignInWithGoogle/>
    </Flex>
  );
}