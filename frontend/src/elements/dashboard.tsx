import GraphicsLayout from "./graphics";
import { use, useEffect, useState } from "react";
import "../styles/dashboard.css";
import TablaReportes from "./table";
import ReportHeader from "./reportHeader";
import ExportButtons from "./exportButtons";
import axios from "axios";
import { fetchReportData } from "../services/reportServices";

const registros = [
    { id: 1, producto: "Laptop", ventas: 15000, fecha: "2025-08-01" },
    { id: 2, producto: "Mouse", ventas: 5000, fecha: "2025-08-02" },
];

export default function Dashboard() {
    const [modulo, setModulo] = useState("");
    const [data, setData] = useState();

    useEffect(() => {
        if (!modulo) return;

        const fetchData = async () => {
            try {
                let result = null;
                if (modulo === "clientes") {
                    result = await fetchReportData("users");
                } else if (modulo === "productos") {
                    result = await fetchReportData("products");
                }
                setData(result);
            } catch (error) {
                console.error("Error cargando datos:", error);
            }
        };
        fetchData();
    }, [modulo]);

    return (
        <div className="dashboard-container">
            <header>
                <ReportHeader onChange={setModulo} />
            </header>
            <section >
                <GraphicsLayout Data={data} Modulo={modulo} />
            </section>
            <section>
                <TablaReportes data={registros} />
            </section>
            <section>
                <ExportButtons />
            </section>
        </div>
    )
}