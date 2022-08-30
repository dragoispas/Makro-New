/* eslint-disable consistent-return */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/require-default-props */
/* eslint-disable no-else-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/function-component-definition */

import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number; label?: number; makro: string }
) => {
  const getColor = () => {
    if (props.makro === 'protein') {
      return '#83b28d';
    } else if (props.makro === 'fat') {
      return '#EF4444';
    } else if (props.makro === 'carbs') {
      return '#ef9a44';
    }
  };
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress sx={{ color: getColor() }} variant="determinate" {...props} />
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
        {props.label && props.label !== 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Typography
              sx={{ height: '12px', userSelect: 'none' }}
              variant="caption"
              component="div"
              color="text.secondary">{`${Math.round(props.label)} g`}</Typography>
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
              sx={{ userSelect: 'none' }}>
              {props.makro}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Typography
              sx={{ height: '12px', userSelect: 'none' }}
              variant="caption"
              component="div"
              color="text.secondary">{`0 g`}</Typography>
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
              sx={{ userSelect: 'none' }}>
              {props.makro}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
