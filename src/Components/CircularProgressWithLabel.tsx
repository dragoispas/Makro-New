import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type CircularProgressWithLabelProps = CircularProgressProps & {
  value: number;
  label?: number;
  makro: string
};

export default function CircularProgressWithLabel(
  { makro, value, label }: CircularProgressWithLabelProps,
) {
  const getColor = (makroColor: string): string => {
    if (makroColor === 'protein') {
      return '#83b28d';
    } if (makroColor === 'fat') {
      return '#EF4444';
    } if (makroColor === 'carbs') {
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
          justifyContent: 'center',
        }}
      >
        {label && label !== 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{ height: '12px', userSelect: 'none' }}
              variant="caption"
              component="div"
              color="text.secondary"
            >
              {`${Math.round(label)} g`}
            </Typography>
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
              sx={{ userSelect: 'none' }}
            >
              {makro}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{ height: '12px', userSelect: 'none' }}
              variant="caption"
              component="div"
              color="text.secondary"
            >
              0 g
            </Typography>
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
              sx={{ userSelect: 'none' }}
            >
              {makro}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
