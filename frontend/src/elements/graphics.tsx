import Barchart from "../components/barchart";
import Linechart from "../components/linechart";
import Piechart from "../components/piechart";
import Scatterchart from "../components/scatterchart";
import "../styles/graphics.css" 

export default function Graphics(){
    return(
        <div className="graphics-container">
            <div className="graphic"> <Barchart /> </div>
            <div className="graphic"> <Linechart /> </div>
            <div className="graphic"> <Scatterchart /> </div>
        </div>
    )
}