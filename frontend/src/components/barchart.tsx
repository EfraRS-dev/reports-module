import { BarChart } from '@mui/x-charts/BarChart';

export type BarChartData = {
    categorias: string[];
    count: number[]; 
}

export default function Barchart({ data }: { data: BarChartData }) {
    console.log("Datos del gráfico de barras:", data);
    return (
        <BarChart
            xAxis={[{ id: 'barCategories', data: data.categorias }]}
            series={[{ data: data.count }]}
            width={540}
            height={300}
            borderRadius={25}
        />
    )
}