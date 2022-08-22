import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const MenuButton = styled(Typography)<{ isActive?: boolean }>`
  width: 100px;
  text-align: center;
  cursor: pointer;
  // font-weight: bold;
  // font-size: 18px;
  // color: #a56b65;

  ${({ isActive }) => (isActive ? 'opacity: 100%;' : 'opacity: 60%;')}

  &:hover {
    // border-bottom: 1px solid;
    // transform: translate(0px, 2px);
    opacity: 80%;
  }

  transition: 0.25s;
`;

interface Props {
  activePage: string;
}

export const Header: React.FC<Props> = ({ activePage }) => {
  const navigate = useNavigate();
  const goToDiary = useCallback(() => navigate('/diary', { replace: true }), [navigate]);
  const goToTrends = useCallback(() => navigate('/trends', { replace: true }), [navigate]);
  const goToSettings = useCallback(() => navigate('/settings', { replace: true }), [navigate]);
  const logout = useCallback(() => navigate('/login', { replace: true }), [navigate]);

  return (
    <Stack direction="row" justifyContent="space-between" sx={{ width: '90vw' }} gap="40px">
      <Stack direction="row" gap="60px">
        <Typography color="text.primary">MAKRO</Typography>
        <MenuButton
          color="text.primary"
          onClick={() => goToDiary()}
          isActive={activePage.includes('diary')}>
          DIARY
        </MenuButton>
        <MenuButton
          color="text.primary"
          onClick={() => goToTrends()}
          isActive={activePage.includes('trends')}>
          TRENDS
        </MenuButton>
        <MenuButton
          color="text.primary"
          onClick={() => goToSettings()}
          isActive={activePage.includes('settings')}>
          SETTINGS
        </MenuButton>
      </Stack>
      <MenuButton
        color="text.primary"
        onClick={() => logout()}
        isActive={false}
        sx={{ margin: '0 20px;' }}>
        LOGOUT
      </MenuButton>
    </Stack>
  );
};
