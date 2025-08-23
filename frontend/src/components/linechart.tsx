import { LineChart } from '@mui/x-charts/LineChart';

const margin = { right: 24 };

export type LineChartData = {
    soldData: number[];
    stockData: number[];
    productsName: string[];
    Labels: string[];
};

export default function Linechart({data} : {data: LineChartData}) {
    return (
        <LineChart
            width={540}
            height={300}
            series={[
                { data: data.soldData, label: data.Labels[0]},
                { data: data.stockData, label: data.Labels[1]},
            ]}
            xAxis={[{ scaleType: 'point', data: data.productsName }]}
            yAxis={[{ width: 50 }]}
            margin={margin}
        />
    );
}
