import { Container, Title, Text, Header, rem, Group, useMantineTheme, Badge, px, AspectRatio, Image, Breadcrumbs } from '@mantine/core'
import React from 'react'
import { Head } from '../Component/Head'
import '../css/panel.css'
import { Foot } from '../Component/Foot'
import { useViewportSize  } from '@mantine/hooks';


export function Privacy() {
  const theme = useMantineTheme();
  const { width, height } = useViewportSize();


  return (
    <div style={{ minHeight: "100vh", position: "relative"}}>
      <Header height={rem(60)} p="sm" mb={rem(50)} className="header">
        <Container>
          <Group position="apart">
            <Title
            order={2}
            size="h4"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
            weight={900}
            align="center"
            mb="xl"
            
          >
            <Text component="a" href="./">
              Hit&Blow.online
            </Text>
            </Title>
          </Group>
        </Container>
      </Header>
      <Container size="xs" >
          <Breadcrumbs separator=">">
            <Text size="xs" td="underline" component="a" href="./" color="dimmed">ホーム</Text>
            <Text size="xs" color="dimmed">プライバシーポリシー</Text>
          </Breadcrumbs>
          <Title
            mt={rem(50)}
            order={2}
            size="h3"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
            weight={900}
            align="center"
          >
            プライバシーポリシー
          </Title>
        <Group position="right" px="xl">
          <AspectRatio ratio={500/500} h={rem(70)} w={rem(70)} style={{bottom: -1*px(rem(40)), zIndex: -1}}>
            <Image src="./images/privacy.png"/>
          </AspectRatio>
        </Group>

        <div className="panel" style={{padding: theme.spacing.md, marginTop: theme.spacing.xl, marginBottom: theme.spacing.xl}}>
        <Badge color="dark" variant='filled'>ユーザーデータの取り扱いについて</Badge>
        <Text 
          color="dimmed" 
          size="sm" 
          pt="lg"
          pb="xs"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
        >
          当サイトではログイン時にアカウント情報を収集しておりますが、ゲーム内での個人識別とサービス改善にのみ使用し、本人の同意なく第三者に提供することはありません。
        </Text>
        </div>

        <div className="panel" style={{padding: theme.spacing.md, marginTop: 2*px(theme.spacing.xl), marginBottom: theme.spacing.xl}}>
        <Badge color="dark" variant='filled'>アクセス解析ツールについて</Badge>
        <Text 
          color="dimmed" 
          size="sm" 
          pt="lg"
          pb="xs"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
        >
          当サイトではアクセス解析にGoogle Analyticsを使用しています。収集したデータは当サイトのサービス向上のために使用いたします。
        </Text>
        <Group position='right'><Text size="xs" color="dimmed" td="underline" component="a" href="https://marketingplatform.google.com/about/analytics/terms/jp/">Google Analytics利用規約</Text></Group>
        </div>

        <div className="panel" style={{padding: theme.spacing.md, marginTop: 2*px(theme.spacing.xl), marginBottom: rem(120)}}>
        <Badge color="dark" variant='filled'>プライバシーポリシー記載内容について</Badge>
        <Text 
          color="dimmed" 
          size="sm" 
          pt="lg"
          pb="xs"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
        >
          本プライバシーポリシーは予告なく改定される場合があります。ご了承ください。
        </Text>
        </div>
      </Container>
      <Foot />
    </div>
  )
}
