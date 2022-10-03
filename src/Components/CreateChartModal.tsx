import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Autocomplete, Fab, FormControl, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -60%)',
  borderRadius: '10px',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '24px',
};

const top100Films = [
  { name: 'weight', category: 'BODY' },
  { name: 'waist', category: 'BODY' },
  { name: 'arm', category: 'BODY' },
  { name: 'calories', category: 'MACRO' },
  { name: 'protein', category: 'MACRO' },
  { name: 'fat', category: 'MACRO' },
  { name: 'carbs', category: 'MACRO' },
];

export default function CreateChartModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Fab onClick={handleOpen} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{
            fontSize: '0.75rem', opacity: 0.6, marginTop: '10px', marginBottom: '30px', color: 'text.primary',
          }}
          >
            CHART DETAILS
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Age"
              // onChange={handleChange}
            >
              <MenuItem value="Line">Line</MenuItem>
              <MenuItem value="Bar">Bar</MenuItem>
              <MenuItem value="Pie">Pie</MenuItem>
            </Select>
          </FormControl>
          <Autocomplete
            sx={{ marginTop: '20px' }}
            groupBy={(option) => option.category}
            multiple
            id="tags-standard"
            options={top100Films}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Items"
                // placeholder="Favorites"
              />
            )}
          />

          <Box sx={{ display: 'flex', marginTop: '20px' }}>
            <Button
              sx={{ width: '64px', marginLeft: 'auto' }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
