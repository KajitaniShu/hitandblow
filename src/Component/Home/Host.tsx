import '../../css/panel.css'
import '../../css/button.css'
import '../../css/badge.css'
import '../../css/host.css'
import { setPlayerData } from '../../Config/firebase'
import { 
  Group, 
  Container,
  ScrollArea,
  Button,
  Badge,
  px,
  Avatar,
  Flex,
  Text,
  ActionIcon,
  Center,
  Modal,
  useMantineTheme,
  Paper,
  Divider,
  ThemeIcon,
  rem
} from '@mantine/core';
import { 
  useDisclosure, 
} from '@mantine/hooks';
import { 
  IconRotate,
  IconChevronRight
} from '@tabler/icons-react';

import { CharacterSetting } from './CharacterSetting'




export function Host({userData, roomData, height}:any) {
  const [opened, { open, close }] = useDisclosure(false); // モーダルオープン用
  const theme = useMantineTheme();
  
  return (
    <Paper withBorder radius="md" pt={rem(8)}  style={{width: "100%", height: height, zIndex:10}}>
      <Container>
        {roomData && roomData.length > 0 && userData && userData.length > 0 &&
          <>
          <Group noWrap spacing={8} py={rem(5)} >
            <ThemeIcon variant="filled" radius="xl" size={rem(14)} color="dark" >
              <IconChevronRight size={rem(10)} stroke={3}/>
            </ThemeIcon>
            <Text fw={900} size="xs" sx={{ fontFamily: 'Greycliff CF, sans-serif' }}>
              {roomData[0].host.name !== null ? roomData[0].host.name : " - "}
            </Text>
          </Group>
          <Divider pb="xs" variant="dashed"/>
          
          <ScrollArea h={5*px(height)/10} type="never" >
            {roomData[0].host.character !== null && roomData[0].host.number !== null ?
              <Flex
                direction={{ base: 'column', xs: 'row' }}
                gap="xl"
                justify={{ xs: 'center' }}
              >
                  <Center h={5*px(height)/10} m="none">
                      <Avatar p="none" size={8*px(height)/16} src={'./images/character/'+ roomData[0].host.character +'.png'}  />
                  </Center>
                  <Center h={5*px(height)/10} m="none">
                    <div>
                    <Group>
                      <Group  position='apart'>
                      <Text color="dark" weight="600" size="xs" >
                        ■ レベル:
                      </Text>
                      <Text color="dark" weight="600" size="xs">
                        {roomData[0].host.level !== null ? roomData[0].host.level : " - "}
                      </Text>
                      </Group>
                    </Group>

                    <Group>
                      <Group position='apart'>
                      <Text color="dark" weight="600" size="xs">■ 戦績:</Text>
                      <Text color="dark" weight="600" size="xs">
                        {roomData[0].host.win !== null && roomData[0].host.lose !== null ? roomData[0].host.win + "/" + roomData[0].host.lose : " - "}
                      </Text>
                      </Group>
                    </Group>
                    </div>
                  </Center>
              </Flex>
              :
              <Center h={5*px(height)/9}>
                {(roomData[0].host.number === null || roomData[0].host.character === null) && userData[0].assignType === "host" &&
                <>
                  <Modal onClose={close} withCloseButton={false} opened={opened}  size="auto" centered >
                    <CharacterSetting userData={userData} isHost={true} close={close}/> 
                  </Modal>
                  <Button onClick={open} color="yellow" variant="filled">準備する</Button>
                </>
                }
                {(roomData[0].host.number === null || roomData[0].host.character === null) && userData[0].assignType === "guest" &&
                <>
                  <Text size="sm" color="dimmed" weight="600">対戦相手を待っています...</Text>
                </>
                }
              </Center>
          }
          </ScrollArea>
          {roomData[0].host.character !== null && roomData[0].host.number !== null &&
            <Group position="right" spacing={8} noWrap mt="none">
              {userData[0].assignType === "host" &&
              <>
              <ActionIcon size="sm" radius="xl" variant="default" onClick={()=>
                setPlayerData(
                  true,              // isHost,
                  userData[0].assign, // roomId,
                  userData[0].uuid,   // uuid,
                  null,               // number,
                  null,               // character
                  userData[0].name,   // name
                  userData[0].level,  // level
                  userData[0].win,    // win
                  userData[0].lose,   // lose
                )}
              >
                <IconRotate size="0.875rem" style={{color: theme.colors.gray[6]}}/>
              </ActionIcon>
              </>
              }
              <Badge variant="filled" size="md" color="dark">
                  Ready !
              </Badge>
            </Group>
          }
          </>
        }
      </Container>
    </Paper>
  )
}
