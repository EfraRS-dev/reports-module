import React from "react";
import { BarChart } from '@mui/x-charts/BarChart';

export default function Barchart() {
    return (
        <BarChart
            xAxis={[{ id: 'barCategories', data: ['bar A', 'bar B', 'bar C', 'bar D', 'bar E', 'bar F'] }]}
            series={[{ data: [2, 5, 3, 6, 9, 10] }]}
            width={540}
            height={300}
            borderRadius={25}
        />
    )
}