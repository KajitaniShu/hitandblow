import React, {useEffect, useState} from 'react'
import { 
  Group, 
  Container,
  Text,
  px,
  useMantineTheme,
  Header,
  ActionIcon,
  Avatar,
  Title,
  SimpleGrid,
  Grid,
  rem,
  Menu,
  Modal,
  TextInput,
  Center,
  Badge,
  Skeleton
} from '@mantine/core';
import {
  useViewportSize,
  useDisclosure
} from '@mantine/hooks';
import { 
  IconDiamondFilled,
  IconInfoSquareRoundedFilled,
  IconZoomQuestion,
  IconUserCircle,
  IconTrophy,
  IconLogout
} from '@tabler/icons-react';
import { GameSetting } from './GameSetting';
import { CharacterSelect } from './CharacterSelect';
import { auth } from '../../Config/firebase'
import { InitName } from './InitName' 
import { UserInfo } from './UserInfo' 
import {collection, doc, getDocs, query, where, getFirestore } from 'firebase/firestore';
import { db }  from '../../Config/firebase';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';



export function Home({user}: any) {
  const { width, height } = useViewportSize();
  const theme = useMantineTheme();
  const componentHeight = px(rem(170));
  const SECONDARY_TOP_HEIGHT= `calc(${componentHeight} / 3 - ${theme.spacing.md})`;
  const SECONDARY_BOTTOM_HEIGHT= `calc((${SECONDARY_TOP_HEIGHT} + ${theme.spacing.md} )*2)`;
  const CENTER_MARGIN = height/7;
  const [modalType, setModalType] = useState('none');
  const userQuery = query(collection(db, "user-data"), where("uuid", "==", user.uid));
  const [userData, loading, error, snapshot, reload] = useCollectionDataOnce(userQuery);


  
  useEffect(() => {
    if(userData && userData.length <= 0) { setModalType('initName'); }
    else if(modalType === 'userInfo') {;}
    else if(modalType !== 'none') setModalType('none');
  })

  return (
    <div style={{height:height}}>
      {/* ユーザーネーム登録モーダル (初期ログイン時に表示する) */}
      <InitName uuid={user.uid} modalType={modalType} setModalType={setModalType} reload={reload} />
      
      {userData && userData.length > 0 && <UserInfo userData={userData} modalType={modalType} setModalType={setModalType} reload={reload}/>}
        <Header height={50} px="md" className="header" bg="dark">
          <Container>
            <Group position="apart" sx={{ height: '100%' }}>
              <Title order={1} size="h4" color="white">Hit&Blow online</Title>
              <Group position="right" px="md" py="sm">
                {userData && userData.length > 0 ? 
                  <>
                    <Avatar radius="xl" size="sm" bg="white">{String(userData[0].level)}</Avatar>
                    <Text color="white" >{String(userData[0].name)}</Text> 
                    <Text color="white"><IconDiamondFilled style={{marginRight:"0.1em"}} size="0.75em"/>{String(userData[0].money)}</Text>
                  </>
                  :
                  <>
                    <Skeleton height={rem(26)} circle />
                    <Skeleton height={rem(8)} radius="xl" width={"5em"} />
                    <Skeleton height={rem(8)} radius="xl" width={"2em"} />
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
                      icon={<IconUserCircle size="1rem" color={theme.colors.blue[6]} stroke={1.5} />}
                    >
                      アカウント情報
                    </Menu.Item>
                    <Menu.Item
                      icon={<IconZoomQuestion size="1rem" color={theme.colors.teal[6]} stroke={1.5} />}
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
        <Container pt="sm" mt={CENTER_MARGIN}>
          <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
              <GameSetting height={componentHeight} userData={userData} />
              <Grid gutter="md">
              <Grid.Col >
                <CharacterSelect height={componentHeight}/>
              </Grid.Col>

              <Grid.Col>
              </Grid.Col>
            </Grid>
          </SimpleGrid>
        </Container>
    </div>
  )
}
