import React, {useEffect, useState} from 'react'
import { 
  Header, 
  Group, 
  ActionIcon, 
  Container,
  rem,
  Title,
  Progress,
  Text,
  Skeleton,
  Menu,
  Avatar,
  useMantineTheme,
  useMantineColorScheme
} from '@mantine/core';
import {
  IconDots,
  IconDiamondFilled,
  IconUserCircle,
  IconZoomQuestion,
  IconLogout,
  IconFileDescription,
  IconSun, 
  IconMoonStars
} from '@tabler/icons-react';
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
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  useEffect(() => {
    if(userData && (userData.length <= 0 || userData[0].name === undefined || userData[0].name === null)) { setModalType('initName'); }
    else if(modalType === 'userInfo') {;}
    else if(modalType !== 'none') setModalType('none');
  })

  return (
    <div>
      {/* ユーザーネーム登録モーダル (初期ログイン時に表示する) */}
      <InitName uuid={user.uid} userData={userData} modalType={modalType} setModalType={setModalType} reload={reload} />
      
      {userData && userData.length > 0 && <UserInfo userData={userData} modalType={modalType} setModalType={setModalType} reload={reload}/>}
      <Header height={height} p="sm" className="header">
      <Container>
        <Group position="apart">
          <Title
            order={1}
            size="h4"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
            weight={900}
            align="center"
            color="dark"
          >
            Hit&Blow.online
          </Title>
          <Group position="right">
            {width > 900 &&
              <>
              {userData && userData.length > 0 ? 
                <>
                  <Text color="dark" weight="bold">{String(userData[0].name)}</Text> 
                  <Group spacing={4}>
                    <IconDiamondFilled size="0.7em" style={{color:theme.colors.dark[6]}}/>
                    <Text color="dark" size="sm" weight="bold">{String(userData[0].money)}</Text>
                  </Group>
                  <Group spacing={0}>
                    <Avatar color="dark" size="sm" radius="3px" variant="filled">{String(userData[0].level)}</Avatar>
                    <Progress w={rem(100)} color="dark" radius="none" size="lg" value={50}  />
                  </Group>
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
              withinPortal
            >
            <Menu.Target>
            <ActionIcon color="dark" radius="sm" size="md"  ><IconDots size="20"/></ActionIcon>
            </Menu.Target>
              <Menu.Dropdown className="mini-panel">
                {userData && userData.length > 0 && 
                  <>
                  <Menu.Item
                    onClick={()=>setModalType('userInfo')}
                    icon={<IconUserCircle size="1rem" color={theme.colors.dark[6]} stroke={1.5} />}
                  >
                    アカウント情報
                  </Menu.Item>
                  </>
                }
                  <Menu.Item
                    icon={<IconZoomQuestion size="1rem" color={theme.colors.dark[6]} stroke={1.5} />}
                  >
                    操作説明
                  </Menu.Item>
                  <Menu.Item
                    component="a" 
                    href="./privacy"
                    icon={<IconFileDescription size="1rem" color={theme.colors.dark[6]} stroke={1.5} />}
                  >
                    プライバシーポリシー
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => toggleColorScheme()}
                    icon={colorScheme === 'dark' ?
                      <IconSun size="1rem" color={theme.colors.dark[6]} stroke={1.5} />
                      :
                      <IconMoonStars size="1rem" color={theme.colors.dark[6]} stroke={1.5} />
                    }
                  >
                    {colorScheme === 'dark' ? "ライトモード" : "ダークモード"}
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
  </div>
  )
}
