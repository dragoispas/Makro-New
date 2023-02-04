import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number; label: number },
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          sx={{ userSelect: 'none' }}
          variant="body2"
          color="text.secondary"
        >
          {`${Math.round(props.label)} cal`}
        </Typography>
      </Box>
      <Box sx={{ width: '100%', mt: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}
