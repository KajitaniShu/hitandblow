import React, { useState } from 'react'
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { Modal, Group, Button, TextInput, Container, Text, ScrollArea } from '@mantine/core';
import { setUser } from '../Config/firebase'
import { useForm } from '@mantine/form';
import { 
  IconPencil, 
  IconPencilOff,
  IconCheck,
  IconUser
} from '@tabler/icons-react';
import '../css/panel.css'
import '../css/badge.css'
import { BackButton } from './BackButton';


export function UserInfo({userData, modalType, setModalType, reload}: any) {
  const [sending, setSending] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const { width, height } = useViewportSize();
  
  const form = useForm({
    initialValues: {
      name:     userData[0].name,
      level:    userData[0].level,
      money:    userData[0].money,
      win:      userData[0].win,
      lose:     userData[0].lose,
      language: userData[0].language,
      friends:  userData[0].friends,
      history:  userData[0].history,
      update:   userData[0].update,
    },

    validate: {
      name: (value) => (value.length > 10 || value.length === 0 ? '1文字以上、10文字以内で入力してください' : null),
    },
  });

  if(modalType === 'userInfo' && !opened) {
    form.setValues({
      name:     userData[0].name,
      level:    userData[0].level,
      money:    userData[0].money,
      win:      userData[0].win,
      lose:     userData[0].lose,
      language: userData[0].language,
      friends:  userData[0].friends,
      history:  userData[0].history,
      update:   userData[0].update,
    });
    open();
  }
  if(modalType !== 'userInfo' && opened) close();

  async function submit(name: any, language: any, uuid: any){
    setSending(true);     // 送信中に決定ボタンを押せないようにローディングを表示
    await setUser(                                          // ユーザー情報に入室済みルームとして追加
      name,                 // name,
      userData[0].uuid,     // uuid,
      userData[0].level,    // level,
      userData[0].money,    // money,
      userData[0].win,      // win,
      userData[0].lose ,    // lose,
      userData[0].language, // language,
      userData[0].friends,  // friends,
      userData[0].history,  // history
    );
    reload();             // ユーザーデータを再読み込み
    setSending(false);    // ローディングを非表示
    setModalType('none'); // 現在開くべきモーダルの種類を'none'(何も開かない) にする
    form.reset();         // フォームに書き込んだ情報をリセット
    close();              // モーダルを閉じる
  }
  
  return (
    <Modal centered opened={opened} size="lg" onClose={()=> {setModalType('none'); form.reset(); close();}}    title={
      <Group noWrap spacing="xs">
        <IconUser size="16"/>
        <Text weight="bold" size="sm">ユーザー情報</Text>
      </Group>
    }
    >
      <form onSubmit={form.onSubmit((values) => { submit(values.name, 'japanese', userData[0].uuid); })}>
      <ScrollArea h={height/2} w="100%" type="never">
      <Container >
        <TextInput
          mt="lg"
          mb="xl"
          size="md"
          label="名前"
          data-autofocus
          placeholder="10文字以内"
          icon={<IconPencil size="1.2rem" />}
          {...form.getInputProps('name')}
        />
        <TextInput
          mb="xl"
          label="レベル"
          bg="white"
          size="md"
          disabled
          {...form.getInputProps('level')}
        />
        <TextInput
          mb="xl"
          label="ポイント"
          size="md"
          disabled
          {...form.getInputProps('money')}
        />
        <TextInput
          mb="xl"
          label="勝ち"
          size="md"
          disabled
          {...form.getInputProps('win')}
        />

        <TextInput
          mb="xl"
          label="負け"
          size="md"
          disabled
          {...form.getInputProps('lose')}
        />
        
        <TextInput
          mb="xl"
          label="言語"
          size="md"
          disabled
          {...form.getInputProps('language')}
        />
      </Container>
      </ScrollArea>
      <Group noWrap position="right" mt="md">
          <Button
            type="submit" 
            leftIcon={<IconCheck style={{color: "black"}} size="1rem" />}
            color="yellow"
            loading={sending}
            disabled={!form.isDirty()}
          >
            <Text color="dark">変更</Text>
          </Button>
        </Group>
      </form>
    </Modal>
  )
}