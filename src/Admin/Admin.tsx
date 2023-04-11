import { useState, useEffect } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Avatar,
  MediaQuery,
  Group,
  Code,
  Title,
  Burger,
  createStyles,
  useMantineTheme,
  ScrollArea,
  Button,
  Image,
  Box,
  Card,
} from '@mantine/core';

import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { PageNotFound } from '../Component/PageNotFound';
import { Login } from './Login';
import { db }  from '../Config/firebase';
import {collection, doc, getDocs, query, where } from 'firebase/firestore';
import { auth } from '../Config/firebase'
import { useAuthState, useSignInWithFacebook } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router-dom'


export function Admin() {
  return (
    
      <Card 
        w={"100%"} h={"100%"} sx={{position:"relative"}} withBorder
      >
        <Card.Section>
          <Login />
        </Card.Section>
      </Card>
  );
}