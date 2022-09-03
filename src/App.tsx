import React, { useEffect } from 'react';
import './App.css';
import { Box, Stack, CircularProgress } from '@mui/material';
import { styled, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { darkTheme, lightTheme } from './app/themes';
import { RootState } from './app/store';
import { retrieveCurrentUser } from './modules/auth/authSlice';
import AppRouter from './app/router';
import { CustomizedTabs } from './Components/CustomTabs';

const AppContainer = styled(Box)<{ themeMode: string }>`
  margin: 0;
  padding: 0;
  background: ${(props) => (props.themeMode === 'dark' ? 'rgba(0, 0, 0, .955)' : '#f4f1eb')};
  min-height: 100vh;
  transition: background-color 0.2s ease;
`;

function App() {
  const { isLoading, themeMode } = useSelector((state: RootState) => state.general);

  const dispatch = useDispatch();

  useEffect(() => {
    (dispatch as ThunkDispatch<any, any, any>)(retrieveCurrentUser());
  }, []);

  return (
    <AppContainer themeMode={themeMode.toString()}>
      <ThemeProvider theme={themeMode.toString() === 'light' ? lightTheme : darkTheme}>
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
      </ThemeProvider>
    </AppContainer>
  );
}

export default App;
