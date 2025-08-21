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
    const report = await this.reportService.exportReport(type);

    res.setHeader('Content-Disposition', `attachment; filename="${report.filename}"`);
    res.setHeader('Content-Type', report.mimeType);
    res.send(report.buffer);
  }
}
