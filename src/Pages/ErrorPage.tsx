/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
import { Stack, Typography } from '@mui/material';

export const ErrorPage: React.FC = () => (
  <Stack sx={{
    justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw',
  }}
  >
    <Typography color="text.primary" variant="h1" sx={{ fontWeight: 'bold' }}>
      404
    </Typography>
    <Typography color="text.primary" variant="h2">
      Oops, Something went wrong!
    </Typography>
  </Stack>
);
