import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import {
  CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';

const data = [
  {
    name: 'Week 1',
    Weight: 79,
    amt: 2400,
  },
  {
    name: 'Week 2',
    Weight: 78,
    amt: 2210,
  },
  {
    name: 'Week 3',
    Weight: 77.8,
    amt: 2290,
  },
  {
    name: 'Week 4',
    Weight: 77.9,
    amt: 2000,
  },
  {
    name: 'Week 5',
    Weight: 77.6,
    amt: 2181,
  },
  {
    name: 'Week 6',
    Weight: 77.3,
    amt: 2500,
  },
  {
    name: 'Week 7',
    Weight: 77.5,
    amt: 2100,
  },
  {
    name: 'Week 8',
    Weight: 77.2,
    amt: 2100,
  },
  {
    name: 'Week 9',
    Weight: 77.1,
    amt: 2100,
  },
  {
    name: 'Week 10',
    Weight: 76.8,
    amt: 2100,
  },
  {
    name: 'Week 11',
    Weight: 76.9,
    amt: 2100,
  },
];

export default function TrendsPage() {
  return (
    <Box sx={{
      marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '40px',
    }}
    >
      <Paper sx={{ width: 1000, height: 500 }}>

        <Typography sx={{
          fontSize: 18, textAlign: 'center', width: '100%', marginBottom: 3, paddingTop: 1,
        }}
        >
          Weight average over the last 11 weeks
        </Typography>
        <ResponsiveContainer width="100%" height="80%">
          <LineChart
            style={{ transform: 'translate(-15px, 10px)' }}
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="name" />
            <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
            <Tooltip contentStyle={{ border: 'none', boxShadow: '0 0 20px rgba(0,0,0,0.3)', borderRadius: '10px' }} />
            {/* <Legend style={{transform:"translate(15px)"}}/> */}
            <Line connectNulls type="monotone" dataKey="Weight" stroke="#ee5b46" activeDot={{ r: 6 }} strokeWidth={2} />
            {/* <Line type="monotone" dataKey="Expected" stroke="#39bd79" strokeWidth={2} /> */}
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}
