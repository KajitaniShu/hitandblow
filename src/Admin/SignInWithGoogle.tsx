import React from 'react'
import { auth } from '../Config/firebase'
import { provider } from '../Config/firebase';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@mantine/core';
import { getAuth, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useViewportSize  } from '@mantine/hooks';



export default function SignInWithGoogle() {
  const { width, height } = useViewportSize();
  function hundleSignIn() {
    if(width > 1000){
      signInWithRedirect(auth, provider);
    }else{
      signInWithPopup(auth, provider);
    }
  }

  return (
    <Button leftIcon={<FcGoogle />} onClick={hundleSignIn} variant="default" color="gray">Googleでログイン</Button>
  )
}
