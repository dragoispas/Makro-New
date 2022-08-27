import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

interface Props {
  color: string;
  label: string;
  amount: number;
  unit?: string;
  procentage: number;
}

export const MiniChart: React.FC<Props> = ({ color, label, amount, unit, procentage }) => {
  return (
    <div
      style={{
        width: '80px',
        height: '80px',
        margin: 'auto',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgressbar
        value={procentage}
        strokeWidth={10}
        styles={buildStyles({
          pathColor: color,
          trailColor: 'grey',
          pathTransition: '0.25s'
        })}
      />
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '14px', height: '14px' }}>{amount}</div>
        <div style={{ fontWeight: 'bold', fontSize: '11px', height: '14px', opacity: '50%' }}>
          {label}
        </div>
      </div>
    </div>
  );
};
