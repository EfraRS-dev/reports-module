import Barchart from './barchart';
import Linechart from './linechart';
import Piechart from './piechart';
import Sparkline from './sparkline';

import '../styles/chartFacade.css';

export type ChartType = 'bar' | 'line' | 'pie' | 'sparkline';

export interface ChartFacadeProps {
  type: ChartType;
  title?: string;
  data?: any;
}

export default function ChartFacade({ type, title, data }: ChartFacadeProps) {

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Barchart data={data} />;
      case 'line':
        return <Linechart data={data} />;
      case 'pie':
        return <Piechart data={data} />;
      case 'sparkline':
        return <Sparkline data={data} />;
      default:
        return <div>Gráfico no encontrado</div>;
    }
  };

  return (
    <div className="chart-facade">
      {title && <h3>{title}</h3>}
      {renderChart()}
    </div>
  );
}
