import ChartFacade from "../components/chartFacade";
import "../styles/graphics.css"

export default function GraphicsLayout({ Data, Modulo }: { Data: any; Modulo: string }) {

    if (Modulo === "clientes") {
        {console.log(Data.dataGraphicOne)}
        return (
            <div className="graphics-container">
                <ChartFacade type="pie" title="Sales Distribution" data={Data.dataGraphicOne} />
                <ChartFacade type="bar" title="Sales Trend" data={Data.dataGraphicTwo} />
            </div>
        )
    }

    if (Modulo === "productos") {
        return (
            <div className="graphics-container">
                <ChartFacade type="bar" title="Product Categories" data={Data.dataGraphicOne} />
                <ChartFacade type="line" title="Product Sales Trend" data={Data.dataGraphicTwo} />
            </div>
        )
    }


}