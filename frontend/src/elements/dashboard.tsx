import GraphicsLayout from "./graphics";
import { useEffect, useState } from "react";
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
    const [data, setData] = useState(null);

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
            <section>
                {/* Evita error cuando data es null */}
                {data ? (
                    <GraphicsLayout Data={data} Modulo={modulo} />
                ) : (
                    <p>Selecciona un módulo para ver los gráficos</p>
                )}
            </section>
            <section>
                {data ? (
                    <TablaReportes
                        data={
                            modulo === "clientes"
                                ? (data as any).dataTable.map((user: any) => ({
                                    name: user.name,
                                    email: user.email,
                                    mostPurchasedCategory: user.mostPurchasedCategory,
                                    paymentsQuantity: user.paymentsQuantity
                                }))
                                : (data as any).dataTable.map((product: any) => ({
                                    name: product.name,
                                    category: product.category,
                                    price: product.price,
                                    stock: product.stock
                                }))
                        }
                    />
                ) : (
                    <p>Cargando datos...</p>
                )}
            </section>
            <section>
                <ExportButtons Data={data}/>
            </section>
        </div>
    )
}