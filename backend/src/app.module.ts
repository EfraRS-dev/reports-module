import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module'; // Adjust the import path as necessary
@Module({
  imports: [ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
