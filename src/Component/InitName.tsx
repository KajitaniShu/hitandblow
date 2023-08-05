import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, TextInput, Text } from '@mantine/core';
import { addUser } from '../Config/firebase'
import { useForm } from '@mantine/form';
import { 
  IconPencil, 
  IconCheck 
} from '@tabler/icons-react';
import '../css/panel.css'
import '../css/button.css'

export function InitName({uuid, modalType, setModalType, reload}: any) {
  const [sending, setSending] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: '',
    },

    validate: {
      name: (value) => (value.length > 10 ? '10文字以内で入力してください' : null),
    },
  });
  if(modalType === 'initName' && !opened) open();
  if(modalType !== 'initName' && opened) close();

  async function submit(name: any, language: any, uuid: any){
    setSending(true);     // 送信中に決定ボタンを押せないようにローディングを表示
    await addUser(name, 'japanese', uuid);  // firebaseにデータを追加
    
    close();              // モーダルを閉じる
    setSending(false);    // ローディングを非表示
    reload();             // ユーザーデータを再読み込み
  }
  
  return (
    <Modal centered withCloseButton={false} opened={opened} onClose={close}  title={<Group><IconPencil size="1.2rem"/><Text weight="bold">ユーザーネームを設定してください</Text></Group>}
        styles={(theme) => ({
          header: {
            backgroundColor: theme.colors.yellow[6],
            height:"3em",
            borderBottom: "1px solid black"
          },
          content: {
            border: "1px solid black",
            borderRadius: "8px"
          }
        })}
    >
      <form onSubmit={form.onSubmit((values) => { submit(values.name, 'japanese', uuid); })}>
        <TextInput
          my="xl"
          mx="md"
          size="lg"
          data-autofocus
          placeholder="10文字以内"
          {...form.getInputProps('name')}
        />
        <Group noWrap position="right" mt="md">
          <Button
            className="button"
            type="submit" 
            leftIcon={<IconCheck size="1rem" />}
            color="yellow"
            loading={sending}
          >
            決定
          </Button>
        </Group>
      </form>
    </Modal>
  )
}