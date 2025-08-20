import Graphics from "./graphics";
import "../styles/dashboard.css";
import TablaReportes from "./table";
import ReportHeader from "./reportHeader";
import ExportButtons from "./exportButtons";
import Cards from "../components/card";

const registros = [
  { id: 1, producto: "Laptop", ventas: 15000, fecha: "2025-08-01" },
  { id: 2, producto: "Mouse", ventas: 5000, fecha: "2025-08-02" },
];

export default function Dashboard(){
    return(
        <div className="dashboard-container">
            <header>
                <ReportHeader />
            </header>
            <section >
                <Graphics />
            </section>
            <section>
                <Cards />
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