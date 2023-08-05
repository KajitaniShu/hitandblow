import React from 'react'
import { auth } from '../Config/firebase'
import { googleProvider } from '../Config/firebase';
import { IconUser } from '@tabler/icons-react';
import { Button, ThemeIcon } from '@mantine/core';
import { getAuth, signInAnonymously } from "firebase/auth";


export default function SignInWithAnonymous({...props}: any) {
  function hundleSignIn() {
    signInAnonymously(auth);
  }

  return (
    <Button leftIcon={<ThemeIcon size="xs" variant="filled" radius="xl" color="white" ><IconUser style={{color: "black"}}/></ThemeIcon>} onClick={hundleSignIn} variant="default" color="gray" {...props}>匿名ログイン</Button>
  )
}
