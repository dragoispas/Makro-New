import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, CssBaseline, PaletteMode, Stack, Switch, Typography } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DiaryPage } from './Pages/DiaryPage';
import { SettingsPage } from './Pages/SettingsPage';
import { TrendsPage } from './Pages/TrendsPage';
import { LoginPage } from './Pages/LoginPage';
import { CreateAccountPage } from './Pages/CreateAccountPage';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { ErrorPage } from './Pages/ErrorPage';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkMode from '@mui/icons-material/DarkMode';

const AppContainer = styled(Box)<{themeMode:string}>`

  margin: 0;
  padding: 0;
  background: ${props => props.themeMode === "dark" ? "rgba(0,0,0,0.955)" : "#f4f1eb"};
  min-height: 100vh;
  transition: background-color 0.2s ease;


    // background-image: url("https://plepo.com/wp-content/uploads/2021/05/Q5WPRTV2H1GBKY1D-867x579.png");
    // background-size: auto;

    // // opacity: 0.1;

`;

export const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 28,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(8px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(26px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 26,
    height: 26,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#primary' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

function App() {
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#ee5b46",
      },
      secondary: {
        main: "#033631",
      },
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
        '"Segoe UI Symbol"',
      ].join(','),
    },
    
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
            boxShadow:"0 0 20px rgba(0,0,0,0.1)",
            transition:"background-color 0.2s ease"
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            transition: "color 0.2s ease"
          }
        }
      }
    }
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ee5b46",
      },
      secondary: {
        main: "#033631",
      },
    },
    transitions: {

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
        '"Segoe UI Symbol"',
      ].join(','),
    },
    
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
            backgroundColor:"#050505",
            boxShadow:"0 0 20px rgba(0,0,0,0.7)",
            transition:"background-color 0.2s ease",
            borderColor:"rgba(250,250,250,0.1)"
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            transition: "color 0.2s ease"
          }
        }
      }
    }
  });
  return (
    // <div className="App">
    <AppContainer themeMode={themeMode.toString()}>
      <ThemeProvider theme={themeMode.toString()==="light" ? lightTheme : darkTheme}>
      <div className='background-image'></div>
       {/* <ThemeProvider theme={darkTheme}> */}
         {/* <CssBaseline /> */}
          <Router>
          
          <Stack>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent={"center"} sx={{position:"absolute", margin:"0 40vw", width:"20vw", marginTop:"40px"}}>
              <DarkModeIcon></DarkModeIcon>
              <AntSwitch onChange={e => setThemeMode(themeMode==="light" ? "dark" : "light")} inputProps={{ 'aria-label': 'ant design' }} />
            </Stack>
            {/* <Header/> */}
            <div style={{margin: "auto", padding: "20px"}}>
            <Routes>
              <Route path='/diary' element={<DiaryPage/>}/>
              <Route path='/settings' element={<SettingsPage/>}/>
              <Route path='/trends' element={<TrendsPage/>}/>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/create-account' element={<CreateAccountPage/>}/>
              <Route path='*' element={<ErrorPage/>}/>
            </Routes>
            </div>
          </Stack>
        </Router>
        </ThemeProvider>
      </AppContainer>
    
  );
}

export default App;
