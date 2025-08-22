// utils/downloadReport.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";


// función para extraer el nombre de archivo del header Content-Disposition
function getFilenameFromDisposition(disposition?: string): string | null {
  if (!disposition) return null;
  const match = disposition.match(/filename\*?=(?:UTF-8'')?([^;]+)/i);
  return match ? decodeURIComponent(match[1].replace(/['"]/g, "")) : null;
}

export async function downloadReport(type: "pdf" | "excel") {
  const res = await axios.get(`${API_URL}/report/download`, {
    params: { type },
    responseType: "blob", // 👈 clave: recibimos blob
  });

  // obtener filename desde Content-Disposition
  const cd = res.headers["content-disposition"];
  const filename =
    getFilenameFromDisposition(cd) || (type === "pdf" ? "report.pdf" : "report.xlsx");

  // crear link de descarga
  const url = window.URL.createObjectURL(res.data);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
