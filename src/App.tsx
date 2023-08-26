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
import { useColorScheme } from '@mantine/hooks';
import { InviteScene } from './Scene/InviteScene';


export function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);
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
            dark: [
              '#C1C2C5',
              '#A6A7AB',
              '#909296',
              '#5C5F66',
              '#373A40',
              '#2C2E33',
              '#25262B',
              '#1A1B1E',
              '#141517',
              '#101113',
            ],
          },
          primaryColor: 'brand',
          primaryShade: { light: 6, dark: 4 },
          components: {
            Button: {
              defaultProps: (theme) => ({
                color: theme.colorScheme === 'dark' ? "yellow" : "yellow",
              })
            },
          },
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