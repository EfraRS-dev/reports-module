import "../styles/reportHeader.css";

interface ReportHeaderProps {
  onChange: (value: string) => void;
}

export default function ReportHeader({ onChange }: ReportHeaderProps) {
  return (
    <div className="report-header">
      <label htmlFor="categoria">Módulo:</label>
      <select id="categoria" className="selectBox" defaultValue="" onChange={(e) => onChange(e.target.value)}>
        <option value="">Seleccione...</option>
        <option value="clientes">Clientes</option>
        <option value="productos">Productos</option>
      </select>
    </div>
  );
}