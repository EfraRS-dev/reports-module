import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ReportService {
    constructor(private readonly prisma: PrismaService) { }

    async generateUsersReport() {
        const categories: { [key: string]: number } = {
            appliances: 0 ,
            cleaning: 0,
            clothing: 0,
            furniture: 0,
        };
        const users = await this.prisma.user.findMany({
            select: {
                name: true, 
                email:true,
                createdAt: true,
                
            }
        })
        
    }

    async generateProductsReport() {

    }

    async generateSalesReport() {

    }

    async generateLastReport() {

    }
}