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
  Badge
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
import {collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db }  from '../../Config/firebase';


export function Home({user}: any) {
  const { width, height } = useViewportSize();
  const theme = useMantineTheme();
  const componentHeight = px(rem(170));
  const SECONDARY_TOP_HEIGHT= `calc(${componentHeight} / 3 - ${theme.spacing.md})`;
  const SECONDARY_BOTTOM_HEIGHT= `calc((${SECONDARY_TOP_HEIGHT} + ${theme.spacing.md} )*2)`;
  const CENTER_MARGIN = height/7;
  const [opened, { open, close }] = useDisclosure(false);
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    if(user && userData === undefined){
      // データを取得
      let _userData: any = [];
      const dataList = query(collection(db, "user-data"), where("uuid", "==", user.uid));

      // ユーザーデータ取得
      getDocs(dataList).then((snapShot)=>{
        if(snapShot.docs.length > 0) {    // ユーザーデータが格納されていた
          // userDataにデータベースのデータを格納
          const _data = JSON.stringify(snapShot.docs.map((doc) => {
            const data = doc.data();
            _userData.push({
              id:     doc.ref.id,
              name:   data.name,
              uuid:   data.uuid,
              win:    data.win,
              lose:   data.lose,
              level:  data.level,
              language: data.language,
              friends: data.friends,
              history: data.history,
              update: data.update
            })
            setUserData(_userData);
          }));
        }
        else{ // ユーザーデータが未登録だった
          open();
        }
        console.log(userData)
      });
    }
  });


  return (
    <div style={{height:height}}>
      {/* ユーザーネーム登録モーダル (初期ログイン時に表示する) */}
      <Modal centered withCloseButton={false} opened={opened}  onClose={close} classNames={{content: "small-panel"}}  title={<Badge className="badge" size="lg" mb="md" >ユーザーネームを設定してください</Badge>}>
        <InitName uuid={user.uid} close={close}/>
      </Modal>

        <Header height={50} px="md" className="header" bg="dark">
          <Container>
            <Group position="apart" sx={{ height: '100%' }}>
              <Title order={1} size="h4" color="white">Hit&Blow online</Title>
              <Group position="right" px="md" py="sm">
                <Avatar radius="xl" size="sm" bg="white">120</Avatar>
                <Text color="white" >ひいらぎ</Text>
                <Text color="white"><IconDiamondFilled style={{marginRight:"0.1em"}} size="0.75em"/>1000</Text>
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
                      icon={<IconUserCircle size="1rem" color={theme.colors.blue[6]} stroke={1.5} />}
                    >
                      アカウント設定
                    </Menu.Item>
                    <Menu.Item
                      icon={<IconTrophy size="1rem" color={theme.colors.violet[6]} stroke={1.5} />}
                    >
                      対戦履歴
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
              <GameSetting height={componentHeight} />
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
