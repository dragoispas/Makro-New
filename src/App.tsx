import React, { useState } from 'react';
import './App.css';
import { Box, PaletteMode, Stack, Switch } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { DiaryPage } from './Pages/DiaryPage';
import { SettingsPage } from './Pages/SettingsPage';
import { TrendsPage } from './Pages/TrendsPage';
import { LoginPage } from './Pages/LoginPage';
import { ErrorPage } from './Pages/ErrorPage';

const AppContainer = styled(Box)<{ themeMode: string }>`
  margin: 0;
  padding: 0;
  background: ${(props) => (props.themeMode === 'dark' ? 'rgba(0,0,0,0.955)' : '#f4f1eb')};
  min-height: 100vh;
  transition: background-color 0.2s ease;
`;

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)'
    }
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#primary' : '#1890ff'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200
    })
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box'
  }
}));

function App() {
  const [themeMode, setThemeMode] = useState<PaletteMode>('light');

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#ee5b46'
      },
      secondary: {
        main: '#033631'
      }
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(',')
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '10px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none'
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '10px',
            boxShadow: '0 0 20px rgba(0,0,0,0.1)',
            transition: 'background-color 0.2s ease'
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            transition: 'color 0.2s ease'
          }
        }
      }
    }
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#ee5b46'
      },
      secondary: {
        main: '#033631'
      }
    },
    transitions: {},
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(',')
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '10px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none'
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '10px',
            backgroundColor: '#050505',
            boxShadow: '0 0 20px rgba(0,0,0,0.7)',
            transition: 'background-color 0.2s ease',
            borderColor: 'rgba(250,250,250,0.1)'
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            transition: 'color 0.2s ease'
          }
        }
      }
    }
  });
  return (
    // <div className="App">
    <AppContainer themeMode={themeMode.toString()}>
      <ThemeProvider theme={themeMode.toString() === 'light' ? lightTheme : darkTheme}>
        <div className="background-image" />
        {/* <ThemeProvider theme={darkTheme}> */}
        {/* <CssBaseline /> */}
        <Router>
          <Stack>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
              sx={{ position: 'absolute', margin: '0 40vw', width: '20vw', marginTop: '40px' }}>
              <DarkModeIcon />
              <AntSwitch
                onChange={(e) => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
                inputProps={{ 'aria-label': 'ant design' }}
              />
            </Stack>
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
