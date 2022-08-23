import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { PaletteMode, Stack, Switch } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';

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
    backgroundColor: 'transparent'
  },
  '& .MuiTabs-indicatorSpan': {
    // maxWidth: 40,
    width: '100%',
    backgroundColor: '#ee5b46'
  }
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
      color: 'primary'
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)'
    }
  })
);

interface Props {
  themeMode: PaletteMode;
  setThemeMode: (newMode: PaletteMode) => void;
  isLoggedIn: boolean;
}

export const CustomizedTabs: React.FC<Props> = ({ themeMode, setThemeMode, isLoggedIn }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        goToDiary();
        break;
      case 1:
        goToTrends();
        break;
      case 2:
        goToSettings();
        break;
    }
  };

  const navigate = useNavigate();
  const goToDiary = React.useCallback(() => navigate('/diary', { replace: true }), [navigate]);
  const goToTrends = React.useCallback(() => navigate('/trends', { replace: true }), [navigate]);
  const goToSettings = React.useCallback(
    () => navigate('/settings', { replace: true }),
    [navigate]
  );
  const logout = React.useCallback(() => navigate('/login', { replace: true }), [navigate]);

  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction="row"
        justifyContent={isLoggedIn ? 'space-between' : 'flex-end'}
        alignItems="center"
        spacing={2}
        sx={{ margin: '0 50px', height: '70px' }}>
        {isLoggedIn ? (
          <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
            <StyledTab label="Diary" />
            <StyledTab label="Trends" />
            <StyledTab label="Settings" />
          </StyledTabs>
        ) : (
          <></>
        )}
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <DarkModeIcon sx={{ color: themeMode.toString() === 'light' ? 'black' : 'white' }} />
          <AntSwitch
            onChange={(e) => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
            inputProps={{ 'aria-label': 'ant design' }}
          />
        </Stack>

        {/* <Avatar sx={{ bgcolor: deepPurple[500] }}>DI</Avatar> */}
        {/* <Box sx={{ p: 3 }} /> */}
      </Stack>
    </Box>
  );
};
