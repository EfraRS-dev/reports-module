import ChartFacade from "../components/chartFacade";
import "../styles/graphics.css"

export default function GraphicsLayout({ Data, Modulo }: { Data: any; Modulo: string }) {

    if (Modulo === "clientes") {
        console.log("Datasooos papa", Data.dataGraphicOne)
        console.log("Datasooos", Data.dataGraphicTwo)
        return (
            <div className="graphics-container">
                <ChartFacade type="pie" title="Sales Distribution" data={Data.dataGraphicOne} />
                <ChartFacade type="bar2" title="Sales Trend" data={Data.dataGraphicTwo} />
            </div>
        )
    }

    if (Modulo === "productos") {
        return (
            <div className="graphics-container">
                <ChartFacade type="bar" title="Product Categories" data={Data.dataGraphicTwo} />
                <ChartFacade type="line" title="Product Sales Trend" data={Data.dataGraphicOne} />
            </div>
        )
    }


}