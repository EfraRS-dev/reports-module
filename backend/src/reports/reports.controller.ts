import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('download')
  async download(@Query('type') type: 'pdf' | 'excel', @Res() res: Response) {
    const data = [
      { name: 'Ana', age: 25 },
      { name: 'Juan', age: 30 },
    ]; // 🔹 Ejemplo, o lo recibes de DB

    const buffer = await this.reportsService.generate(type, data);
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
