import { useState } from "react";
import "../styles/exportButtons.css";
import { downloadReport } from "../utils/downloadReport";

export default function ExportButtons() {
  const [loading, setLoading] = useState<"pdf" | "excel" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async (type: "pdf" | "excel") => {
    try {
      setError(null);
      setLoading(type);
      await downloadReport(type);
    } catch (err: any) {
      setError("Error al descargar: " + (err.message || "desconocido"));
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="ExportButtons">
      <button
        className="btn-pdf"
        onClick={() => handleDownload("pdf")}
        disabled={loading !== null}
      >
        {loading === "pdf" ? "Generando..." : "PDF"}
      </button>

      <button
        className="btn-excel"
        onClick={() => handleDownload("excel")}
        disabled={loading !== null}
      >
        {loading === "excel" ? "Generando..." : "Excel"}
      </button>

      {error && <p style={{ color: "red", fontSize: 12 }}>{error}</p>}
    </div>
  );
}
