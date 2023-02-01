import React, { useEffect } from 'react';
import './App.css';
import {
  Box, Stack, CircularProgress, Snackbar, Alert, Button,
} from '@mui/material';
import { styled, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createImportSpecifier } from 'typescript';
import { useSnackbar, VariantType, SnackbarProvider } from 'notistack';
import { darkTheme, lightTheme } from './app/themes';
import { RootState } from './app/store';
import type { AppDispatch } from './app/store';
import { retrieveCurrentUser } from './modules/auth/authSlice';
import AppRouter from './app/router';
import { CustomizedTabs } from './Components/CustomTabs';
import IntegrationNotistack from './Components/Notifications';

const AppContainer = styled(Box)<{ thememode: string }>`
  margin: 0;
  padding: 0;
  background: ${(props) => (props.thememode === 'dark' ? 'rgba(0, 0, 0, .955)' : '#f4f1eb')};
  min-height: 100vh;
  transition: background-color 0.2s ease;
`;

function App() {
  const { isLoading, themeMode } = useSelector((state: RootState) => state.general);
  // const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  useEffect(() => {
    (dispatch as AppDispatch)(retrieveCurrentUser());
  }, []);

  return (
    <AppContainer thememode={themeMode.toString()}>
      <ThemeProvider theme={themeMode.toString() === 'light' ? lightTheme : darkTheme}>
        {/* <SnackbarProvider maxSnack={3}> */}
        <IntegrationNotistack />
        <div className="background-image" />
        <Router>
          <CustomizedTabs />
          <Stack>
            <div style={{ margin: 'auto', padding: '20px' }}>
              {
                // eslint-disable-next-line no-constant-condition
                isLoading ? (
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                  </Box>
                ) : <AppRouter />
              }
            </div>
          </Stack>
        </Router>
        {/* </SnackbarProvider> */}
      </ThemeProvider>
    </AppContainer>
  );
}

export default App;
