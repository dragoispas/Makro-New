import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CircularProgressWithLabel({
  makro,
  label,
  value
}: CircularProgressProps & { value: number; label: number; makro: string }) {
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
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Typography
            sx={{ height: '12px' }}
            variant="caption"
            component="div"
            color="text.secondary">{`${Math.round(label)} g`}</Typography>
          <Typography variant="caption" component="div" color="text.secondary">
            {makro}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
