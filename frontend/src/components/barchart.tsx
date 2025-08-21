import { BarChart } from '@mui/x-charts/BarChart';

export type BarChartData = {
    name: string[];
    value: number[]; 
}

export default function Barchart({ data }: { data: BarChartData }) {
    return (
        <BarChart
            xAxis={[{ id: 'barCategories', data: data.name }]}
            series={[{ data: data.value }]}
            width={540}
            height={300}
            borderRadius={25}
        />
    )
}