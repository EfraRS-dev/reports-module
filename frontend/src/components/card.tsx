import "../styles/cards.css";

export default function Cards(){
    return(
        <div className="cards">
            <div className="card">
                <p>Ventas totales</p>
                <p>$20,000</p>
            </div>
            <div className="card">
                <p>Productos vendidos</p>
                <p>300</p>
            </div>
            <div className="card">
                <p>Clientes atendidos</p>
                <p>150</p>
            </div>
        </div>
    )
}