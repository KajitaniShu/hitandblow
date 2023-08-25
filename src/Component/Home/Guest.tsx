import '../../css/panel.css'
import '../../css/button.css'
import '../../css/badge.css'
import '../../css/guest.css'
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
  ThemeIcon,
  Divider,
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




export function Guest({userData, roomData, height}:any) {
  const theme = useMantineTheme();

  const [opened, { open, close }] = useDisclosure(false); // モーダルオープン用
  
  return (
    <Paper pt={rem(8)} shadow="sm" radius="md" style={{width: "100%", height: height, zIndex:10}}  sx={{border: theme.colorScheme === "dark" ? "1px solid #61677A": "2px solid black"}}>
      <Container>
        {roomData && roomData.length > 0 && userData && userData.length > 0 &&
          <>
          <Group noWrap spacing={8} py={rem(5)} >
            <ThemeIcon variant="filled" radius="xl" size={rem(14)} color={theme.colorScheme === "dark" ? "gray" : "dark"} style={{color: theme.colorScheme === "dark" ? "black" : "white"}}>
              <IconChevronRight size={rem(10)} stroke={4}/>
            </ThemeIcon>
            <Text fw={900} size="xs"  sx={{ fontFamily: 'Greycliff CF, sans-serif' }}>
              {roomData[0].guest.name !== null ? roomData[0].guest.name : " - "}
            </Text>
          </Group>
          <Divider pb="xs" variant="dashed"/>

          <ScrollArea h={5*px(height)/10} type="never">
            {roomData[0].guest.character !== null && roomData[0].guest.number !== null ?
              <Flex
                direction={{ base: 'column', xs: 'row' }}
                gap={rem(40)}
                justify={{ xs: 'center' }}
              >
                  <Center h={5*px(height)/10}>
                      <Avatar size={8*px(height)/16} radius={rem(200)} style={{overflow: "visible"}} bg={theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]} src={'./images/character/'+ roomData[0].guest.character +'.png'}  p="none" />
                  </Center>
                  <Center h={5*px(height)/10}>
                    <div>
                    <Group>
                      <Group  position='apart'>
                      <Text weight="600" size="xs" >
                        ■ レベル:
                      </Text>
                      <Text weight="600" size="xs" >
                        {roomData[0].guest.level !== null ? roomData[0].guest.level : " - "}
                      </Text>
                      </Group>
                    </Group>

                    <Group>
                      <Group position='apart'>
                      <Text weight="600" size="xs" >■ 戦績:</Text>
                      <Text weight="600" size="xs" >
                        {roomData[0].guest.win !== null && roomData[0].guest.lose !== null ? roomData[0].guest.win + "/" + roomData[0].guest.lose : " - "}
                      </Text>
                      </Group>
                    </Group>
                    </div>
                  </Center>
              </Flex>
              :
              <Center h={5*px(height)/9}>
                {(roomData[0].guest.number === null || roomData[0].guest.character === null) && userData[0].assignType === "guest" &&
                <>
                  <Modal onClose={close} withCloseButton={false} opened={opened}  size="auto" centered 
                    
                  >
                    <CharacterSetting userData={userData} isHost={false} close={close}/> 
                  </Modal>
                  <Button onClick={open} color="yellow" variant="filled">準備する</Button>
                </>
                }
                {(roomData[0].guest.number === null || roomData[0].guest.character === null) && userData[0].assignType === "host" &&
                <>
                  <Text size="sm" color="dimmed" weight="600">対戦相手を待っています...</Text>
                </>
                }
              </Center>
          }
          </ScrollArea>
          {roomData[0].guest.character !== null && roomData[0].guest.number !== null &&
            <Group position="right" noWrap mt="none" spacing={8}>
              {userData[0].assignType === "guest" &&
              <>
              <ActionIcon size="sm" radius="xl" variant="transparent" onClick={()=>
                setPlayerData(
                  false,              // isHost,
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
                <IconRotate size="0.8rem" color={theme.colorScheme === "dark" ? theme.colors.gray[3] : "black"}/>
              </ActionIcon>
              </>
              }
              <Badge variant="filled" size="md"color={theme.colorScheme === "dark" ? "yellow" : "dark"} style={{color:theme.colorScheme === "dark" ? "black" : "white"}} >
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
