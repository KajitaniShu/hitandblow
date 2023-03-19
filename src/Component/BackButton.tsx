import { Button } from '@mantine/core';
import { IconHome2 } from '@tabler/icons-react';
import '../Component/Button.css'

export function BackButton() {
  return (
    <Button component="a" href="/" variant="outline" color="gray" leftIcon={<IconHome2 size="18"/>} className="gray-button">ホームに戻る</Button>
  );
}