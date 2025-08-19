import { Injectable } from '@nestjs/common';
import { PdfExporter } from './exporters/pdf-exporter';
import { ExcelExporter } from './exporters/excel-exporter';

@Injectable()
export class ReportsService {
  async generate(type: 'pdf' | 'excel', data: any) {
    const exporter = type === 'pdf' ? new PdfExporter() : new ExcelExporter();
    return exporter.export(data);
  }
}
