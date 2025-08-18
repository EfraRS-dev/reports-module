import Graphic from "../components/graphic";
import "../styles/graphics.css" 

export default function Graphics(){
    return(
        <div className="graphics-container">
            <Graphic/>
            <Graphic/>
            <Graphic/>
        </div>
    )
}