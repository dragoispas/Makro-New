import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularProgressNoLabel({
  makro,
  value
}: CircularProgressProps & { value: number; makro: string }) {
  const getColor = (makroType: string): string => {
    if (makroType === 'protein') {
      return '#83b28d';
    }
    if (makroType === 'fat') {
      return '#EF4444';
    }
    if (makroType === 'carbs') {
      return '#ef9a44';
    }

    return '#000';
  };
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress sx={{ color: getColor(makro) }} variant="determinate" value={value} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    </Box>
  );
}
