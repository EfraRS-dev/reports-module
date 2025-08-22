import ChartFacade from "../components/chartFacade";
import "../styles/graphics.css" 

export default function GraphicsLayout() {
    // Mock data for PieChart
    const pieData = {
        data: [
            { id: 0, value: 10, label: 'Product A' },
            { id: 1, value: 15, label: 'Product B' },
            { id: 2, value: 20, label: 'Product C' },
        ]
    };

    // Mock data for Sparkline
    const sparklineData = {
        data: [1, 3, 2, 5, 4, 7, 6],
        data2: [2, 4, 3, 6, 5, 8, 7]
    };

    return (
        <div className="graphics-container">
            <ChartFacade type="pie" title="Sales Distribution" data={pieData} />
            <ChartFacade type="sparkline" title="Sales Trend" data={sparklineData} />
        </div>
    )
}