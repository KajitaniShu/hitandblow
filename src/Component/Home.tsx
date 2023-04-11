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
  Menu
} from '@mantine/core';
import {
  useViewportSize
} from '@mantine/hooks';
import { 
  IconDiamondFilled,
  IconInfoSquareRoundedFilled,
  IconZoomQuestion,
  IconUserCircle,
  IconTrophy,
  IconLogout
} from '@tabler/icons-react';
import { GameSetting } from '../Component/GameSetting';
import { CharacterSelect } from '../Component/CharacterSelect';
import { auth } from '../Config/firebase'


export function Home() {
  const { width, height } = useViewportSize();
  const theme = useMantineTheme();
  const componentHeight = px(rem(170));
  const SECONDARY_TOP_HEIGHT= `calc(${componentHeight} / 3 - ${theme.spacing.md})`;
  const SECONDARY_BOTTOM_HEIGHT= `calc((${SECONDARY_TOP_HEIGHT} + ${theme.spacing.md} )*2)`;
  const CENTER_MARGIN = height/7;

  return (
    <div style={{height:height}}>
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
                  width={180}
                  withinPortal
                >
                <Menu.Target>
                <ActionIcon style={{color:"white"}} variant="transparent"><IconInfoSquareRoundedFilled size="20"/></ActionIcon>
                </Menu.Target>
                  <Menu.Dropdown>
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
