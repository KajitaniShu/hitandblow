import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useRoutes
} from 'react-router-dom'
import { PageNotFound } from './Component/PageNotFound';
import { GameScene } from './Scene/GameScene';
import { 
  MantineProvider, 
  ColorSchemeProvider, 
  ColorScheme, 
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { HomeScene } from './Scene/HomeScene';
import { Privacy } from './Scene/Privacy';
import { InviteScene } from './Scene/InviteScene';


export function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider 
        withGlobalStyles 
        withNormalizeCSS
        theme={{
          colorScheme,
          breakpoints: {
            xs: '22em',
            sm: '48em',
            md: '64em',
            lg: '74em',
            xl: '90em',
          },
          colors: {
            brand: [
              "#FFF3BF",
              "#FFEC99",
              "#FFE066",
              "#FFD43B",
              "#FCC419",
              "#FAB005",
              "#F59F00",
              "#F08C00",
              "#E67700"],
          },
          primaryColor: 'brand',
          primaryShade: { light: 6, dark: 5 }
        }}
      >
        <ModalsProvider>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
              <Route index element={<HomeScene/>} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/invite/:id" element={<InviteScene/>} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}