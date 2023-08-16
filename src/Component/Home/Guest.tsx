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
  Modal
} from '@mantine/core';
import { 
  useDisclosure, 
} from '@mantine/hooks';
import { 
  IconRotate,
} from '@tabler/icons-react';
import { CharacterSetting } from './CharacterSetting'




export function Guest({userData, roomData, height}:any) {
  const [opened, { open, close }] = useDisclosure(false); // モーダルオープン用
  
  return (
    <div className="panel panel-shadow panel-border bg-guest" style={{width: "100%", height: height, zIndex:10}}>
      <Container>
        {roomData && roomData.length > 0 && userData && userData.length > 0 &&
          <>
          <Badge variant="filled" color="dark" mt="sm" mb="xs">
            {roomData[0].guest.name !== null ? roomData[0].guest.name : " - "}
          </Badge>
          <ScrollArea h={5*px(height)/9} type="never">
            {roomData[0].guest.character !== null && roomData[0].guest.number !== null ?
              <Flex
                direction={{ base: 'column', xs: 'row' }}
                gap="md"
                justify={{ xs: 'center' }}
              >
                  <Center h={5*px(height)/9}>
                      <Avatar radius="1000px" size={8*px(height)/11} src={'./images/character/'+ roomData[0].guest.character +'.png'}  p="sm" />
                  </Center>
                  <Center h={5*px(height)/9}>
                    <div>
                    <Group>
                      <Group  position='apart'>
                      <Text fz="sm" c="dark" weight="800">
                        ■ レベル:
                      </Text>
                      <Text fz="sm" c="dark" weight="800">
                        {roomData[0].guest.level !== null ? roomData[0].guest.level : " - "}
                      </Text>
                      </Group>
                    </Group>

                    <Group>
                      <Group position='apart'>
                      <Text fz="sm" c="dark" weight="800">■ 戦績:</Text>
                      <Text fz="sm" c="dark" weight="800">
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
                  <Modal onClose={close} withCloseButton={false} opened={opened}  size="auto" centered >
                    <CharacterSetting userData={userData} isHost={false} close={close}/> 
                  </Modal>
                  <Button onClick={open} color="dark">準備する</Button>
                </>
                }
                {(roomData[0].guest.number === null || roomData[0].guest.character === null) && userData[0].assignType === "host" &&
                <>
                  <Text color="dark" weight="600">準備中...</Text>
                </>
                }
              </Center>
          }
          </ScrollArea>
          {roomData[0].guest.character !== null && roomData[0].guest.number !== null &&
            <Group position="right" noWrap>
              {userData[0].assignType === "guest" &&
              <>
              <ActionIcon size="sm" radius="xl" variant="default" onClick={()=>
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
                <IconRotate size="0.875rem" />
              </ActionIcon>
              </>
              }
              <Badge variant="filled" color="dark">
                  Ready !
              </Badge>
            </Group>
          }
          </>
        }
      </Container>
    </div>
  )
}
