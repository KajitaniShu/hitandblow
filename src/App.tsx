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


export function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
              <Route index element={<HomeScene/>} />
              <Route path="/room/:id" element={<GameScene/>} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}