import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const CircularProgressNoLabel = (
  props: CircularProgressProps & { value: number, makro: string },
) => {
    const getColor = () => {
        if(props.makro==="protein"){
            return "#83b28d";
        }else if(props.makro==="fat"){
            return "#EF4444";
        }else if(props.makro==="carbs"){
            return "#ef9a44";
        }
      }
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress sx={{color: getColor()}} variant="determinate" {...props} />
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
        
      </Box>
    </Box>
  );
}