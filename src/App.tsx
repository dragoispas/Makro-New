import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, CssBaseline, PaletteMode, Switch } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DiaryPage } from './Pages/DiaryPage';
import { SettingsPage } from './Pages/SettingsPage';
import { TrendsPage } from './Pages/TrendsPage';
import { LoginPage } from './Pages/LoginPage';
import { CreateAccountPage } from './Pages/CreateAccountPage';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { ErrorPage } from './Pages/ErrorPage';

const AppContainer = styled(Box)<{themeMode:string}>`

  margin: 0;
  padding: 0;
  background: ${props => props.themeMode === "dark" ? "#292622" : "#f4f1eb"};
  min-height: 100vh;
  transition: background-color 0.2s ease;


    // background-image: url("https://plepo.com/wp-content/uploads/2021/05/Q5WPRTV2H1GBKY1D-867x579.png");
    // background-size: auto;

    // // opacity: 0.1;

`;

export const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
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
    width: 32,
    height: 32,
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

function App() {
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");

  const theme = createTheme({
    palette: {
      mode: themeMode,
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
            boxShadow:"0 0 20px rgba(0,0,0,0.1)"
          }
        }
      },
    }
  });
  return (
    // <div className="App">
    <AppContainer themeMode={themeMode.toString()}>
      <ThemeProvider theme={theme}>
      <div className='background-image'></div>
       {/* <ThemeProvider theme={darkTheme}> */}
         {/* <CssBaseline /> */}
          <Router>
          
          <div style={{display: "flex", flexDirection:"column"}}>
            <MaterialUISwitch onChange={e => setThemeMode(themeMode==="light" ? "dark" : "light")} sx={{position:"absolute"}}></MaterialUISwitch>
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
          </div>
        </Router>
        </ThemeProvider>
      </AppContainer>
    
  );
}

export default App;
