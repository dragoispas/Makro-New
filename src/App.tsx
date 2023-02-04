import React, { useEffect } from 'react';
import './App.css';
import {
  Box, CircularProgress, Stack, styled, ThemeProvider,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { darkTheme, lightTheme } from './app/themes';
import { RootState } from './app/store';
import { retrieveCurrentUser } from './modules/auth/authSlice';
import AppRouter from './app/router';
import { CustomizedTabs } from './Components/CustomTabs';
import { useAppDispatch } from './core/hooks/useAppDispatch';

const AppContainer = styled(Box, { shouldForwardProp: (prop) => prop !== 'themeMode' })<{ themeMode: string }>`
  margin: 0;
  padding: 0;
  background: ${(props) => (props.themeMode === 'dark' ? 'rgba(0, 0, 0, .955)' : '#f4f1eb')};
  min-height: 100vh;
  transition: background-color 0.2s ease;
`;

function App() {
  const { isLoading, themeMode } = useSelector((state: RootState) => state.general);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(retrieveCurrentUser());
  }, []);

  return (
    <AppContainer themeMode={themeMode}>
      <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
        <SnackbarProvider maxSnack={3}>
          <div className="background-image" />
          <Router>
            <CustomizedTabs />
            <Stack>
              <div style={{ margin: 'auto', padding: '20px' }}>
                {
                isLoading ? (
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                  </Box>
                ) : <AppRouter />
              }
              </div>
            </Stack>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </AppContainer>
  );
}

export default App;
