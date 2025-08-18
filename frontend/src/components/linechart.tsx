import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const margin = { right: 24 };
const uData = [4000, 3000, 2000, 2780];
const pData = [2400, 1398, 9800, 3908];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
];

export default function Linechart() {
    return (
        <LineChart
            width={350}
            height={240}
            series={[
                { data: pData, label: 'pv' },
                { data: uData, label: 'uv' },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            yAxis={[{ width: 50 }]}
            margin={margin}
        />
    );
}
