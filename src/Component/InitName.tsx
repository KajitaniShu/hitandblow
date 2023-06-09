import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, TextInput, Center, Badge } from '@mantine/core';
import { addUser } from '../Config/firebase'
import { useForm } from '@mantine/form';
import { 
  IconPencil, 
  IconCheck 
} from '@tabler/icons-react';
import '../css/panel.css'
import '../css/button.css'
import '../css/badge.css'

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
    <Modal centered withCloseButton={false} opened={opened}  onClose={close} classNames={{content: "small-panel"}}  title={<Badge className="badge" size="lg" mb="md" >ユーザーネームを設定してください</Badge>}>
      <form onSubmit={form.onSubmit((values) => { submit(values.name, 'japanese', uuid); })}>
        <TextInput
          mb="xl"
          size="lg"
          data-autofocus
          placeholder="10文字以内"
          icon={<IconPencil size="1.2rem" />}
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