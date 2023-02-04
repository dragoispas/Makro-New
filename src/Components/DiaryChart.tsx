import styled from '@emotion/styled';
import { Box, Stack } from '@mui/material';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

const macroColors = {
  totalProtein: '#83b28d',
  totalFat: '#EF4444',
  totalCarbs: '#ef9a44',
};
const MacroGraph = styled(Box)<{ amount: number; macro: string }>`
  border-radius: 2px;
  height: 32px;
  width: ${(props) => props.amount * 0.8 + 3}px;
  max-width: 300px;
  background-color: ${(props) => macroColors[props.macro as keyof typeof macroColors]};
  opacity: 0.9;

  transition: 0.25s;
`;

const ChartContainer = styled(Stack)`
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  padding: 5px;

  .progressbar_container {
    padding: 30px;
    border-radius: 5px;
    width: 175px;
  }

  .progressbar {
    width: 175px;
    height: 175px;
    margin: auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.9;
  }

  .progressbar_label {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .progressbar_label_amount {
    font-weight: bold;
    font-size: 20px;
    height: 20px;
  }

  .progressbar_label_unit {
    font-weight: bold;
    font-size: 16px;
    height: 20px;
    opacity: 50%;
  }

  .makrocharts_container {
    padding: 30px;
    border-radius: 5px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    width: 200px;
    height: 170px;
  }

  .makrochart_container {
    display: flex;
    height: 32px;
    justify-content: center;
  }
`;

interface Props {
  targetCalories: number;
  totalCalories: number;
  totalCarbs: number;
  totalFat: number;
  totalProtein: number;
}

export function DiaryChart({
  targetCalories,
  totalCalories,
  totalCarbs,
  totalFat,
  totalProtein,
}: Props) {
  return (
    <ChartContainer direction="row">
      <Box className="progressbar_container" sx={{ borderRight: 1, borderColor: 'divider' }}>
        <Box className="progressbar">
          <CircularProgressbar
            value={(100 * totalCalories) / targetCalories}
            strokeWidth={19}
            styles={buildStyles({
              pathColor: '#ee5b46',
              trailColor: 'rgba(150,150,150,0.15)',
              pathTransition: '0.25s',
              strokeLinecap: 'butt',
            })}
          />
          <Box className="progressbar_label">
            <div className="progressbar_label_amount">{totalCalories}</div>
            <div className="progressbar_label_unit">cal</div>
          </Box>
        </Box>
      </Box>
      {/* <Box style={{width:"100px"}}></Box> */}
      {/* <Divider wdith="1px" height="200px"></Divider> */}
      <Box className="makrocharts_container">
        <Box className="makrochart_container">
          <MacroGraph amount={totalCarbs} macro="totalCarbs" />
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'start',
              marginLeft: '5px',
              alignItems: 'space-between',
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '16px', height: '17px' }}>{totalCarbs}</div>
            <div style={{
              fontWeight: 'bold', fontSize: '13px', height: '17px', opacity: '50%',
            }}
            >
              totalCarbs
            </div>
          </Box>
        </Box>
        <Box className="makrochart_container">
          <MacroGraph amount={totalFat} macro="totalFat" />
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'start',
              marginLeft: '5px',
              alignItems: 'space-between',
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '16px', height: '17px' }}>{totalFat}</div>
            <div style={{
              fontWeight: 'bold', fontSize: '13px', height: '17px', opacity: '50%',
            }}
            >
              totalFat
            </div>
          </Box>
        </Box>
        <Box className="makrochart_container">
          <MacroGraph amount={totalProtein} macro="totalProtein" />
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'start',
              marginLeft: '5px',
              alignItems: 'space-between',
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '16px', height: '17px' }}>
              {totalProtein}
            </div>
            <div style={{
              fontWeight: 'bold', fontSize: '13px', height: '17px', opacity: '50%',
            }}
            >
              totalProtein
            </div>
          </Box>
        </Box>
      </Box>
    </ChartContainer>
  );
}
