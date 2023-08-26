import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, TextInput, Text, rem, Paper, ThemeIcon, useMantineTheme, Divider } from '@mantine/core';
import { addUser, setName } from '../Config/firebase'
import { useForm } from '@mantine/form';
import { 
  IconPencil, 
  IconCheck 
} from '@tabler/icons-react';
import '../css/panel.css'
import '../css/button.css'

export function InitName({uuid, modalType, userData, setModalType, reload}: any) {
  const [sending, setSending] = useState(false);
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: '',
    },

    validate: {
      name: (value) => (value.length > 10 || value.length === 0 ? '1文字以上、10文字以内で入力してください' : null),
    },
  });
  if(modalType === 'initName' && !opened) open();
  if(modalType !== 'initName' && opened) close();

  async function submit(name: any, language: any, uuid: any){
    setSending(true);                                                 // 送信中に決定ボタンを押せないようにローディングを表示
    if(userData.length === 0) await addUser(name, 'japanese', uuid);  // firebaseにデータを追加
    setName(name, uuid);
    setSending(false);    // ローディングを非表示
    close();              // モーダルを閉じる
    reload();             // ユーザーデータを再読み込み
  }
  
  return (
    <Modal.Root centered opened={opened} onClose={close}
    >
      <Modal.Overlay />
      <Modal.Content sx={{backgroundColor: "transparent"}}>
        
      <Paper p="md" shadow="sm" radius="md" sx={{border: theme.colorScheme === "dark" ? "1px solid #5C5F66": "2px solid black"}}>
      
      <Group noWrap spacing={8} pb={rem(5)} >
        <IconPencil size="1.2rem"/><Text weight="bold" size="sm">ユーザーネームを設定してください</Text>
      </Group>
      <Divider variant="dashed" mt="xs" />
      <form onSubmit={form.onSubmit((values) => { submit(values.name, 'japanese', uuid); })}>
        <TextInput
          my={rem(30)}
          mx="md"
          size="lg"
          data-autofocus
          placeholder="10文字以内"
          {...form.getInputProps('name')}
        />
        <Group noWrap position="right">
          <Button
            variant="filled"
            type="submit" 
            leftIcon={<IconCheck size="1rem" />}
            loading={sending}
            sx={{color: theme.colorScheme === "dark" ? "#141517" : "white"}}
          >
            決定
          </Button>
        </Group>
      </form>
      </Paper>
      </Modal.Content>
    </Modal.Root>
  )
}