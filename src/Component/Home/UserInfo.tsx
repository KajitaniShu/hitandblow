import React, { useState } from 'react'
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { Modal, Group, Button, TextInput, Center, Badge, ScrollArea } from '@mantine/core';
import { setUser } from '../../Config/firebase'
import { useForm } from '@mantine/form';
import { 
  IconPencil, 
  IconPencilOff,
  IconCheck 
} from '@tabler/icons-react';
import '../../css/panel.css'
import '../../css/button.css'
import '../../css/badge.css'


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
      name: (value) => (value.length > 10 ? '10文字以内で入力してください' : null),
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
    await setUser(userData[0].uuid, name, userData[0].money, userData[0].win, userData[0].lose, userData[0].level, language, userData[0].friends, userData[0].history);  // firebaseにデータを追加
    reload();             // ユーザーデータを再読み込み
    close();              // モーダルを閉じる
    setSending(false);    // ローディングを非表示
    setModalType('none'); // 現在開くべきモーダルの種類を'none'(何も開かない) にする
    form.reset();         // フォームに書き込んだ情報をリセット
  }
  
  return (
    <Modal centered opened={opened}  onClose={()=> {setModalType('none'); form.reset(); close();}} classNames={{content: "small-panel"}}  title={<Badge className="badge" size="lg" mb="md" >ユーザー情報</Badge>}>
      <form onSubmit={form.onSubmit((values) => { submit(values.name, 'japanese', userData[0].uuid); })}>
      <ScrollArea h={height/2}>
        <TextInput
          mb="xl"
          size="lg"
          label="名前"
          data-autofocus
          placeholder="10文字以内"
          icon={<IconPencil size="1.2rem" />}
          {...form.getInputProps('name')}
        />
        <TextInput
          mb="xl"
          label="レベル"
          size="lg"
          disabled
          icon={<IconPencilOff size="1.2rem" />}
          {...form.getInputProps('level')}
        />
        <TextInput
          mb="xl"
          label="ポイント"
          size="lg"
          disabled
          icon={<IconPencilOff size="1.2rem" />}
          {...form.getInputProps('money')}
        />
        <TextInput
          mb="xl"
          label="勝ち"
          size="lg"
          disabled
          icon={<IconPencilOff size="1.2rem" />}
          {...form.getInputProps('win')}
        />

        <TextInput
          mb="xl"
          label="負け"
          size="lg"
          disabled
          icon={<IconPencilOff size="1.2rem" />}
          {...form.getInputProps('lose')}
        />
        
        <TextInput
          mb="xl"
          label="言語"
          size="lg"
          disabled
          icon={<IconPencilOff size="1.2rem" />}
          {...form.getInputProps('language')}
        />
      
      </ScrollArea>
      <Group noWrap position="right" mt="md">
          <Button
            className="button"
            type="submit" 
            leftIcon={<IconCheck size="1rem" />}
            color="yellow"
            loading={sending}
            disabled={!form.isDirty()}
          >
            変更
          </Button>
        </Group>
      </form>
    </Modal>
  )
}