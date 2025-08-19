import "../styles/reportHeader.css";

export default function ReportHeader() {
  return (
    <div className="report-header">
      {/* Selector de categoría */}
      <div className="report-header__left">
        <label htmlFor="categoria">Modulo:</label>
        <select id="categoria">
          <option value="">Seleccione...</option>
          <option value="ventas">Ventas</option>
          <option value="clientes">Clientes</option>
          <option value="productos">Productos</option>
        </select>
      </div>

      {/* Botones de exportación */}
      <div className="report-header__right">
        <button className="btn-pdf">PDF</button>
        <button className="btn-excel">Excel</button>
      </div>
    </div>
  );
}