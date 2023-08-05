import React from 'react'
import { auth } from '../Config/firebase'
import { googleProvider } from '../Config/firebase';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@mantine/core';
import { getAuth, signInWithPopup, signInWithRedirect } from "firebase/auth";


export default function SignInWithGoogle({...props}: any) {
  function hundleSignIn() {
    signInWithPopup(auth, googleProvider);
  }

  return (
    <Button leftIcon={<FcGoogle />} onClick={hundleSignIn} variant="default" color="gray" {...props}>Googleでログイン</Button>
  )
}
