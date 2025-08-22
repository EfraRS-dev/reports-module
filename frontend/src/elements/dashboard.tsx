import GraphicsLayout from "./graphics";
import { useEffect, useState } from "react";
import "../styles/dashboard.css";
import TablaReportes from "./table";
import ReportHeader from "./reportHeader";
import ExportButtons from "./exportButtons";
import axios from "axios";

const registros = [
  { id: 1, producto: "Laptop", ventas: 15000, fecha: "2025-08-01" },
  { id: 2, producto: "Mouse", ventas: 5000, fecha: "2025-08-02" },
];

export default function Dashboard(){
    const [modulo, setModulo] = useState("");
    const [data, setData] = useState(null);



    return(
        <div className="dashboard-container">
            <header>
                <ReportHeader onChange={} />
            </header>
            <section >
                <GraphicsLayout />
            </section>
            <section>
                <TablaReportes data={registros}/>
            </section>
            <section>
                <ExportButtons />
            </section>
        </div>
    )
}