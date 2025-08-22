import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PdfExporter } from './exporters/pdf-exporter';
import { ExcelExporter } from './exporters/excel-exporter';
import { UsersReportBuilder } from 'src/builder/userReportBuilder';
import { Director } from 'src/builder/director';
import { ProductReport } from 'src/builder/productReportBuilder';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async generate(type: 'pdf' | 'excel', data: any) {
    const exporter = type === 'pdf' ? new PdfExporter() : new ExcelExporter();
    return exporter.export(data);
  }

  async generateUsersReport() {
    const userreport = new UsersReportBuilder(this.prisma);
    const director = new Director(userreport);
    await director.build();
    return userreport.getreport();
  }

  async generateProductsReport() {
    const productReport = new ProductReport(this.prisma);
    const director = new Director(productReport);
    await director.build();
    return productReport.getreport();
  }

  //async generateSalesReport() {}

  //async generateLastReport() {}

  async exportReport(type: 'pdf' | 'excel') {
    const data = [
      { name: 'Ana', age: 25 },
      { name: 'Juan', age: 30 },
    ];

    const buffer = await this.generate(type, data);

    return {
      buffer: Buffer.from(buffer),
      filename: `report.${type === 'pdf' ? 'pdf' : 'xlsx'}`,
      mimeType:
        type === 'pdf'
          ? 'application/pdf'
          : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };
  }
}
