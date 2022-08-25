import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number, label?: number, makro: string },
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
        {props.label && props.label!==0? <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <Typography
            sx={{height:"12px"}}
            variant="caption"
            component="div"
            color="text.secondary"
            >{`${Math.round(props.label)} g`}</Typography>
            <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            >{props.makro}</Typography>
            </Box> : <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <Typography
            sx={{height:"12px"}}
            variant="caption"
            component="div"
            color="text.secondary"
            >{`0 g`}</Typography>
            <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            >{props.makro}</Typography>
            </Box>}
      </Box>
    </Box>
  );
}