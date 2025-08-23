import { LineChart } from '@mui/x-charts/LineChart';

export type SparklineData = {
    data: number[];
    data2?: number[];
}

export default function Sparkline({data} : {data: SparklineData}) {
  return (
    <LineChart
      xAxis={[{ data: data.data }]}
      series={[
        {
          data: data.data2,
          area: true,
        },
      ]}
      width={540}
      height={300}
    />
  );
}
