import { Controller, Get, Query, Res } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('users')
  async getUsersReport() {
    return this.reportService.generateUsersReport();
  }

  @Get('products')
  async getProductsReport() {
    return this.reportService.generateProductsReport();
  }

  @Get('sales')
  async getSalesReport() {
    return this.reportService.generateSalesReport();
  }

  @Get('download')
  async download(@Query('type') type: 'pdf' | 'excel', @Res() res: Response) {
    const data = [
      { name: 'Ana', age: 25 },
      { name: 'Juan', age: 30 },
    ];

    const buffer = await this.reportService.generate(type, data);

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="report.${type === 'pdf' ? 'pdf' : 'xlsx'}"`,
    );
    res.setHeader(
      'Content-Type',
      type === 'pdf'
        ? 'application/pdf'
        : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.send(Buffer.from(buffer));
  }
}
