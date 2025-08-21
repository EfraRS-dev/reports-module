import { PieChart } from '@mui/x-charts/PieChart';

export type PieChartData = {
    data: {
        id: number;
        value: number;
        label: string;
    }[];
}

export default function Piechart({data} : {data: PieChartData}) {
    return (
        <PieChart
            series={[
                {
                    data: data.data,
                },
            ]}
            width={350}
            height={280}
        />
    );
}
