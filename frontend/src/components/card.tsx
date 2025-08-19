import "../styles/cards.css";

export default function Cards(){
    return(
        <div className="cards">
            <div className="card">
                <p>Ventas Totales</p>
                <p>$20,000</p>
            </div>
            <div className="card">
                <p>Productos Vendidos</p>
                <p>300</p>
            </div>
            <div className="card">
                <p>Clientes Atendidos</p>
                <p>150</p>
            </div>
        </div>
    )
}