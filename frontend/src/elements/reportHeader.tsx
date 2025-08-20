import "../styles/reportHeader.css";

export default function ReportHeader() {
  return (
    <div className="report-header">
      <label htmlFor="categoria">Modulo:</label>
      <select id="categoria" className="selectBox">
        <option value="">Seleccione...</option>
        <option value="ventas">Ventas</option>
        <option value="clientes">Clientes</option>
        <option value="productos">Productos</option>
      </select>
    </div>
  );
}