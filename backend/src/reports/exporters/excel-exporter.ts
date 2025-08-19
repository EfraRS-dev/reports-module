// excel-exporter.ts
import { ReportExporterTemplate } from './report-exporter.template';
import * as ExcelJS from 'exceljs';

export class ExcelExporter extends ReportExporterTemplate {
protected async render(data: any[]): Promise<ArrayBuffer> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Reporte');

  if (data.length > 0) {
    sheet.addRow(Object.keys(data[0]));
    data.forEach((row) => sheet.addRow(Object.values(row)));
  }

  return workbook.xlsx.writeBuffer(); // ✔ Devuelve ArrayBuffer
}
}
