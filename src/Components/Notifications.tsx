import * as React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { RootState } from '../app/store';
import { setNotification } from '../modules/general/generalSlice';

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const notification = useSelector((state: RootState) => state.general.notification);

  React.useEffect(() => {
    if (notification) {
      if (notification.variant) {
        enqueueSnackbar(notification.message, { variant: notification.variant });
      } else {
        enqueueSnackbar(notification.message);
      }
      dispatch(setNotification(null));
    }
  }, [notification]);

  const handleClick = () => {
    enqueueSnackbar('I love snacks.');
  };

  const handleClickVariant = (variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('This is a success message!', { variant });
  };

  return (
    null
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider>
  );
}
