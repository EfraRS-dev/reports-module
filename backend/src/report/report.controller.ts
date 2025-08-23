import { Controller, Get, Query, Res, Post } from '@nestjs/common';
import { ReportService } from './report.service';
import type { Response } from 'express';
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

  @Get('users')
  async getUsersReport() {
    return this.reportService.generateUsersReport();
  }

  @Get('products')
  async getProductsReport() {
    return this.reportService.generateProductsReport();
  }

  @Get('download')
  async download(
    @Query('type') type: 'pdf' | 'excel',
    @Query('data') data: string,   // axios lo manda serializado
    @Res() res: Response
  ) {
    const parsedData = JSON.parse(data); // si lo mandas como string
    console.log("Descargando reporte:", type, parsedData);

    const report = await this.reportService.exportReport(type, parsedData);

    res.setHeader('Content-Disposition', `attachment; filename="${report.filename}"`);
    res.setHeader('Content-Type', report.mimeType);
    res.send(report.buffer);
  }

}
