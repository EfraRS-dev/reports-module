import ChartFacade from "../components/chartFacade";
import "../styles/graphics.css" 

export default function GraphicsLayout() {
    return (
        <div className="graphics-container">
            <ChartFacade type="pie" title="Sales Distribution" data={{}} />
            <ChartFacade type="sparkline" title="Sales Trend" data={{}} />
        </div>
    )
}