import React, { useState } from 'react';
import './App.css';
import { Box, PaletteMode, Stack } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import DiaryPage from './Pages/DiaryPage';
import { SettingsPage } from './Pages/SettingsPage';
import TrendsPage from './Pages/TrendsPage';
import { LoginPage } from './Pages/LoginPage';
import { ErrorPage } from './Pages/ErrorPage';
import { CustomizedTabs } from './Components/CustomTabs';
import { darkTheme, lightTheme } from './app/themes';

const AppContainer = styled(Box)<{ themeMode: string }>`
  margin: 0;
  padding: 0;
  background: ${(props) => (props.themeMode === 'dark' ? 'rgba(0,0,0,0.955)' : '#f4f1eb')};
  min-height: 100vh;
  transition: background-color 0.2s ease;

  // background-image: url("https://plepo.com/wp-content/uploads/2021/05/Q5WPRTV2H1GBKY1D-867x579.png");
  // background-size: auto;

  // // opacity: 0.1;
`;

function App() {
  const [themeMode, setThemeMode] = useState<PaletteMode>('light');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  return (
    // <div className="App">
    <AppContainer themeMode={themeMode.toString()}>
      <ThemeProvider theme={themeMode.toString() === 'light' ? lightTheme : darkTheme}>
        <div className="background-image" />
        {/* <ThemeProvider theme={darkTheme}> */}
        {/* <CssBaseline /> */}
        <Router>
          <CustomizedTabs
            isLoggedIn={isLoggedIn}
            themeMode={themeMode}
            setThemeMode={setThemeMode}
          />
          <Stack>
            {/* <Header/> */}
            <div style={{ margin: 'auto', padding: '20px' }}>
              <Routes>
                <Route path="/diary" element={<DiaryPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/trends" element={<TrendsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </div>
          </Stack>
        </Router>
      </ThemeProvider>
    </AppContainer>
  );
}

export default App;
