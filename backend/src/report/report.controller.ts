import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('users')
  async getUsersReport(): Promise<any> {
    return this.reportService.generateUsersReport();
  }

  @Get('products')
  async getProductsReport(): Promise<any> {
    return this.reportService.generateProductsReport();
  }

  @Get('sales')
  async getSalesReport(): Promise<any> {
    return this.reportService.generateSalesReport();
  }
}
