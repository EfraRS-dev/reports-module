import { PieChart } from '@mui/x-charts/PieChart';

export type ApiPieData = {
  id: number;
  category: string;
  percent: number;
}[];

export default function Piechart({ data }: { data: ApiPieData }) {
  console.log("Datos del gráfico de pie:", data);
  const chartData = data.map(d => ({
    id: d.id,
    value: d.percent,   // MUI espera "value"
    label: d.category,  // MUI espera "label"
  }));

  return (
    <PieChart
      series={[
        {
          data: chartData,
        },
      ]}
      width={350}
      height={280}
    />
  );
}

