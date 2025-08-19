// pdf-exporter.ts
import { ReportExporterTemplate } from './report-exporter.template';
import * as PDFDocument from 'pdfkit';


export class PdfExporter extends ReportExporterTemplate {
  protected async render(data: any[]): Promise<ArrayBuffer> {
    const doc = new PDFDocument();
    const chunks: Uint8Array[] = [];

    return new Promise((resolve, reject) => {
      doc.on('data', (chunk: Uint8Array) => chunks.push(chunk));
      doc.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
      });
      doc.on('error', reject);

      doc.fontSize(16).text('Reporte generado', { align: 'center' });
      doc.moveDown();

      data.forEach((row, index) => {
        doc.fontSize(12).text(`${index + 1}. ${JSON.stringify(row)}`);
      });

      doc.end();
    });
  }
}



