/* eslint-disable max-len */
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

type ChartItem = {
  name: string;
  category: string;
  currentID: string;
  selected: boolean;
}

const chartItemsList:ChartItem[] = [
  {
    name: 'weight', category: 'BODY', currentID: 'tags-standard-option-0', selected: false,
  },
  {
    name: 'waist', category: 'BODY', currentID: 'tags-standard-option-1', selected: false,
  },
  {
    name: 'arm', category: 'BODY', currentID: 'tags-standard-option-2', selected: false,
  },
  {
    name: 'calories', category: 'MACRO', currentID: 'tags-standard-option-3', selected: false,
  },
  {
    name: 'protein', category: 'MACRO', currentID: 'tags-standard-option-4', selected: false,
  },
  {
    name: 'fat', category: 'MACRO', currentID: 'tags-standard-option-5', selected: false,
  },
  {
    name: 'carbs', category: 'MACRO', currentID: 'tags-standard-option-6', selected: false,
  },
];

export default function CreateChartModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [chartType, setChartType] = React.useState<string>('Line');

  const [chartItems, setChartItems] = React.useState<ChartItem[]>(chartItemsList);

  const updateChartItems = (id:string) => {
    const newState = chartItems.map((item) => {
      // 👇️ if id equals 2, update country property
      if (item.currentID === id) {
        return { ...item, selected: !item.selected };
      }

      // 👇️ otherwise return object as is
      return item;
    });

    setChartItems(newState);
  };

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
              value={chartType}
              label="Age"
              onChange={(e) => setChartType(e.target.value)}
            >
              <MenuItem value="Line">Line</MenuItem>
              <MenuItem value="Bar">Bar</MenuItem>
              <MenuItem value="Pie">Pie</MenuItem>
            </Select>
          </FormControl>
          <Autocomplete
            // onChange={(e) => updateChartItems(e.currentTarget.id)}
            // onChange={(e) => console.log(e)}
            sx={{ marginTop: '20px' }}
            groupBy={(option) => option.category}
            multiple
            id="tags-standard"
            options={chartItems}
            getOptionLabel={(option) => option.name}
            // getOptionDisabled={(option) => option.selected === false}
            renderInput={(params) => (
              <TextField
                onChange={(e) => console.log(e.target.value)} // ????
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
