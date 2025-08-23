import { BarChart } from '@mui/x-charts/BarChart';

export type BarChartData = {
    range: string[];
    count: number[]; 
}

export default function Barchart2({ data }: { data: BarChartData }) {
    console.log("Datos del gráfico de barras:", data);
    return (
        <BarChart
            xAxis={[{ id: 'barrange', data: data.range }]}
            series={[{ data: data.count }]}
            width={540}
            height={300}
            borderRadius={25}
        />
    )
}