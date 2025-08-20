import { Controller, Get } from "@nestjs/common";
import { ReportService } from "./report.service";

@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService){}

    @Get('users')
    async getUsersReport(){
        return this.reportService.generateUsersReport();
    }

    @Get('products')
    async getProductsReport(){
        return this.reportService.generateProductsReport();
    }

    @Get('sales')
    async getSalesReport(){
        return this.reportService.generateSalesReport();
    }

}