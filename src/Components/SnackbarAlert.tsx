/* eslint-disable max-len */
import { Button, Snackbar, Alert } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setErrorMessage } from '../modules/general/generalSlice';

export function SnackbarAlert() {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state: RootState) => state.general.errorMessage);

  const [open, setOpen] = React.useState(false);

  const [test, setTest] = React.useState(1);

  useEffect(() => {
    if (errorMessage) {
      setOpen(true);
    }
  }, [errorMessage]);
  useEffect(() => {
    if (!open) {
      dispatch(setErrorMessage(null));
    }
  }, [open]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Button sx={{ position: 'absolute' }} onClick={() => { dispatch(setErrorMessage(test.toString())); setTest((prev) => prev + 1); }}>Trigger Alert</Button>
      <Stack>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Stack>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {errorMessage}
            </Alert>
          </Stack>
        </Snackbar>
      </Stack>

    </>
  );
}
