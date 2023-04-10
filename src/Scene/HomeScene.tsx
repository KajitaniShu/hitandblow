import React, {useEffect} from 'react'
import { 
  Group, 
  Container,
  Paper, 
  ScrollArea,
  Text,
  px,
  Progress,
  Box,
  useMantineTheme,
  Header,
  ActionIcon,
  Avatar,
  Title,
  SimpleGrid,
  Grid,
  rem,
  Button,
  Burger,
  Menu
} from '@mantine/core';
import { 
  useDisclosure, 
  useViewportSize
} from '@mantine/hooks';
import './GameScene.css';
import { 
  IconDiamondFilled,
  IconPackage,
  IconSquareCheck,
  IconUsers,
  IconCalendar,
  IconInfoSquareRoundedFilled
} from '@tabler/icons-react';
import { GameSetting } from '../Component/GameSetting';
import { CharacterSelect } from '../Component/CharacterSelect';
import { Ad } from '../Component/Ad';
import { Clock } from '../Component/Clock'
import { Admin } from '../Admin/Admin'

export function HomeScene() {
  const [opened, { toggle }] = useDisclosure(false);
  const { width, height } = useViewportSize();
  const theme = useMantineTheme();
  const componentHeight = px(rem(170));
  const SECONDARY_TOP_HEIGHT= `calc(${componentHeight} / 3 - ${theme.spacing.md})`;
  const SECONDARY_BOTTOM_HEIGHT= `calc((${SECONDARY_TOP_HEIGHT} + ${theme.spacing.md} )*2)`;
  const CENTER_MARGIN = height/7;

  /*
  useEffect(() => {
    if(user && database === undefined){
      // データを取得
      let _database: any = [];
      const dataList = query(collection(db, "user-data"), where("uuid", "==", user.uid));
      getDocs(dataList).then((snapShot)=>{
        const _data = JSON.stringify(snapShot.docs.map((doc) => {
          const data = doc.data();
          _database.push({
            id:     doc.ref.id,
            name:   data.name,
            uuid:   data.uuid,
            update: data.update,
            json:   JSON.parse(data.json || "[]")
          })
        }));
        setDatabase(_database);
      })
    }
    
  }, [user]);
*/
  return (
    <div style={{height:height}}>
      <Admin/>
      <Header height={50} px="md" className="header" bg="dark">
        <Container>
          <Group position="apart" sx={{ height: '100%' }}>
            <Title order={1} size="h4" color="white">Hit&Blow online</Title>
            <Group position="right" px="md" py="sm">
              <Avatar radius="xl" size="sm" color="violet">120</Avatar>
              <Text color="white">ひいらぎ</Text>
              
              <div style={{backgroundColor:"#26254A", borderRadius: "8px", padding: "0.2em 0.5em"}}>
                <Text color="white"><IconDiamondFilled size="0.75em"/> 1000</Text>
              </div>
              <Menu
              transitionProps={{ transition: 'pop-top-right' }}
              position="top-end"
              width={220}
              withinPortal
            >
              <Menu.Target>
              <ActionIcon style={{color:"white"}} variant="transparent"><IconInfoSquareRoundedFilled size="20"/></ActionIcon>
              </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    icon={<IconPackage size="1rem" color={theme.colors.blue[6]} stroke={1.5} />}
                    rightSection={
                      <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                        Ctrl + P
                      </Text>
                    }
                  >
                    Project
                  </Menu.Item>
                  <Menu.Item
                    icon={<IconSquareCheck size="1rem" color={theme.colors.pink[6]} stroke={1.5} />}
                    rightSection={
                      <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                        Ctrl + T
                      </Text>
                    }
                  >
                    Task
                  </Menu.Item>
                  <Menu.Item
                    icon={<IconUsers size="1rem" color={theme.colors.cyan[6]} stroke={1.5} />}
                    rightSection={
                      <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                        Ctrl + U
                      </Text>
                    }
                  >
                    Team
                  </Menu.Item>
                  <Menu.Item
                    icon={<IconCalendar size="1rem" color={theme.colors.violet[6]} stroke={1.5} />}
                    rightSection={
                      <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                        Ctrl + E
                      </Text>
                    }
                  >
                    Event
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
