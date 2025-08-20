import Barchart from "../components/barchart";
import Linechart from "../components/linechart";
import Piechart from "../components/piechart";
import Sparkline from "../components/sparkline";
import "../styles/graphics.css" 

export default function Graphics(){
    return(
        <div className="graphics-container">
            <div className="graphic"> <Piechart /> </div>
            <div className="graphic"> <Sparkline /> </div>
        </div>
    )
}