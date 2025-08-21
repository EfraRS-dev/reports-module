import { LineChart } from '@mui/x-charts/LineChart';

const margin = { right: 24 };

export type LineChartData = {
    array1: number[];
    array2: number[];
    array3: string[];
    array4: string[];
};

export default function Linechart({data} : {data: LineChartData}) {
    return (
        <LineChart
            width={540}
            height={300}
            series={[
                { data: data.array1, label: data.array4[0]},
                { data: data.array2, label: data.array4[1]},
            ]}
            xAxis={[{ scaleType: 'point', data: data.array3 }]}
            yAxis={[{ width: 50 }]}
            margin={margin}
        />
    );
}
