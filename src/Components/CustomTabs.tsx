import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import {
  Button, PaletteMode, Stack, Switch,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { setThemeMode } from '../modules/general/generalSlice';
import { logout } from '../modules/auth/authSlice';

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
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    // maxWidth: 40,
    width: '100%',
    backgroundColor: '#ee5b46',
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '18px',
    marginRight: theme.spacing(1),
    color: 'text.primary',
    '&.Mui-selected': {
      color: 'primary',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);

export function CustomizedTabs() {
  const [value, setValue] = React.useState(0);
  const themeMode = useSelector(({ general }: RootState) => general.themeMode);
  const user = useSelector(({ auth }: RootState) => auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        navigate('/', { replace: true });
        break;
      case 1:
        navigate('/trends', { replace: true });
        break;
      case 2:
        navigate('/settings', { replace: true });
        break;
      default:
        break;
    }
  }, [navigate]);

  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction="row"
        justifyContent={user ? 'space-between' : 'flex-end'}
        alignItems="center"
        spacing={2}
        sx={{ margin: '0 50px', height: '70px' }}
      >
        {user ? (
          <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
            <StyledTab label="Diary" />
            <StyledTab label="Trends" />
            <StyledTab label="Settings" />
          </StyledTabs>
        ) : null}
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <Button color="inherit" onClick={() => (dispatch as AppDispatch)(logout())}>Logout</Button>
          <DarkModeIcon sx={{ color: themeMode.toString() === 'light' ? 'black' : 'white' }} />
          <AntSwitch
            onChange={(e) => dispatch(setThemeMode(themeMode === 'light' ? 'dark' : 'light'))}
            inputProps={{ 'aria-label': 'ant design' }}
          />
        </Stack>

        {/* <Avatar sx={{ bgcolor: deepPurple[500] }}>DI</Avatar> */}
        {/* <Box sx={{ p: 3 }} /> */}
      </Stack>
    </Box>
  );
}
