import React, {useEffect, useState} from 'react'
import { 
  Header, 
  Group, 
  ActionIcon, 
  Container,
  rem,
  Title,
  Avatar,
  Text,
  Skeleton,
  Menu,
  useMantineTheme
} from '@mantine/core';
import {
  IconInfoSquareRoundedFilled,
  IconDiamondFilled,
  IconUserCircle,
  IconZoomQuestion,
  IconLogout
} from '@tabler/icons-react';
import {
  IoIosShareAlt
} from 'react-icons/io'
import { auth } from '../Config/firebase'
import { InitName } from './InitName' 
import { UserInfo } from './UserInfo' 
import { 
  useViewportSize 
} from '@mantine/hooks';

export function Head({userData, reload, user, height}: any) {
  const [modalType, setModalType] = useState('none');
  const { width } = useViewportSize();
  const theme = useMantineTheme();

  useEffect(() => {
    if(userData && userData.length <= 0) { setModalType('initName'); }
    else if(modalType === 'userInfo') {;}
    else if(modalType !== 'none') setModalType('none');
  })
  
  return (
    <>
      {/* ユーザーネーム登録モーダル (初期ログイン時に表示する) */}
      <InitName uuid={user.uid} modalType={modalType} setModalType={setModalType} reload={reload} />
      
      {userData && userData.length > 0 && <UserInfo userData={userData} modalType={modalType} setModalType={setModalType} reload={reload}/>}
      <Header height={height} p="sm" className="header">
      <Container>
        <Group position="apart">
          <Title order={1} size="h4" color="white" className="title" weight="bolder">Hit&Blow online</Title>
          <Group position="right">
            {width > 900 &&
              <>
              {userData && userData.length > 0 ? 
                <>
                  <Avatar radius="xl" size="sm" bg="white" >{String(userData[0].level)}</Avatar>
                  <Text color="white" weight="bold">{String(userData[0].name)}</Text> 
                  <Group spacing={2}><IconDiamondFilled size="1em" style={{color:"white"}}/><Text color="white" weight="bold">{String(userData[0].money)}</Text></Group>
                </>
                :
                <>
                  <Skeleton height={rem(26)} circle />
                  <Skeleton height={rem(8)} radius="xl" width={"5em"} />
                  <Skeleton height={rem(8)} radius="xl" width={"2em"} />
                </>
              }
              </>
            }
            
            <Menu
              transitionProps={{ transition: 'pop-top-right' }}
              position="top-end"
              width={180}
              withinPortal
            >
            <Menu.Target>
            <ActionIcon style={{color:"white"}} variant="transparent"><IconInfoSquareRoundedFilled size="20"/></ActionIcon>
            </Menu.Target>
              <Menu.Dropdown className="mini-panel">
                <Menu.Item
                  onClick={()=>setModalType('userInfo')}
                  icon={<IconUserCircle size="1rem" color={theme.colors.dark[6]} stroke={1.5} />}
                >
                  アカウント情報
                </Menu.Item>
                <Menu.Item
                  icon={<IconZoomQuestion size="1rem" color={theme.colors.dark[6]} stroke={1.5} />}
                >
                  操作説明
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red" 
                  icon={<IconLogout size="1rem" color={theme.colors.pink[6]} stroke={1.5}  />}
                  onClick={() => auth.signOut()}
                >
                  ログアウト
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </Container>
    </Header>
  </>
  )
}
