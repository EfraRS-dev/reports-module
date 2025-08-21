import { Report } from "./interfaz";
import { UserDto } from "src/dto/user.dto";
import { PaymentDto } from "src/dto/payment.dto";
import { ProductDto, ProductReportDto } from "src/dto/product.dto";
import { PrismaClient } from "@prisma/client";
import { Injectable } from "@nestjs/common";

const prisma = new PrismaClient();

@Injectable()
export class ProductReport implements Report {
    users: UserDto[] = [];
    payments: PaymentDto[] = [];
    products: ProductReportDto[] = [];

    async consultModule(): Promise<ProductReportDto[]> {
        const productData = await prisma.product.findMany({
            select: {
                name: true,
                price: true,
                stock: true,
                category: true,
                sold: true,
                createdAt: true
            }
        });
        return productData;
    }

    async makeStadistics(): Promise<{}> {
        const Products = await this.consultModule();
        Products.map(product => {
            product.MostSoldProductByCategory = this.getMostSoldProductByCategory(Products, product.category);
            product.inventoryStatus = this.getInventoryStatus(product);
        })
        const comparitionData = this.getcomparitionstockandsold(Products);
        const mostSoldByCategory = this.getMostSoldByCategory(Products);
        return {}
    }

    generateReport(): void {
        // Implementation for generating the report
        console.log("Generating user report...");
    }

    getInventoryStatus(product: ProductDto): string {
        if (!product) {
            return "balanced";
        }
        if (product.stock > product.sold * 2) {
            return "overstock";
        }
        if (product.stock < product.sold * 0.2) {
            return "understock";
        }
        return "balanced";
    }

    getcomparitionstockandsold(productData: ProductDto[]) {
        if (!productData || productData.length === 0) {
            return { soldData: [], stockData: [], productsName: [], Labels: [] };
        }
        const soldData = productData.map(product => product.sold);
        const stockData = productData.map(product => product.stock);
        const productsName = productData.map(product => product.name);
        const Labels = ["Product Sold", "Product Stock"];
        return { soldData, stockData, productsName, Labels };
    }

    getMostSoldProductByCategory(productData: ProductDto[], category: string): string | null {
        if (!productData || productData.length === 0) {
            return null;
        }
        const productsInCategory = productData.filter(product => product.category === category);
        if (productsInCategory.length === 0) {
            return null;
        }
        const mostSold = productsInCategory.reduce((prev, current) => (prev.sold > current.sold ? prev : current));
        return mostSold.name;
    }

    getMostSoldByCategory(productData: ProductDto[]): { categories: string[]; sales: number[] } {
        if (!productData || productData.length === 0) {
            return { categories: [], sales: [] };
        }
        const categoryMap = new Map<string, ProductDto[]>();
        productData.forEach(product => {
            if (!categoryMap.has(product.category)) {
                categoryMap.set(product.category, []);
            }
            categoryMap.get(product.category)!.push(product);
        });

        const categories: string[] = [];
        const sales: number[] = [];

        categoryMap.forEach((products, category) => {
            const mostSold = products.reduce((prev, current) => prev.sold > current.sold ? prev : current
            );
            categories.push(category);
            sales.push(mostSold.sold);
        });
        return { categories, sales };
    }

}