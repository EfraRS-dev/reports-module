import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PdfExporter } from './exporters/pdf-exporter';
import { ExcelExporter } from './exporters/excel-exporter';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async generate(type: 'pdf' | 'excel', data: any) {
    const exporter = type === 'pdf' ? new PdfExporter() : new ExcelExporter();
    return exporter.export(data);
  }

  async generateUsersReport() {
    const categories: { [key: string]: number } = {
      appliances: 0,
      cleaning: 0,
      clothing: 0,
      furniture: 0,
    };
    const users = await this.prisma.user.findMany({
      select: {
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async generateProductsReport() {}

  async generateSalesReport() {}

  async generateLastReport() {}
}
