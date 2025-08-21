import { Report } from "./interfaz";
import { ProductDto, ProductReportDto } from "src/dto/product.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


type Categoria = "Electrónicos" | "Mobiliario" | "Accesorios";

@Injectable()
export class ProductReport implements Report<{
    dataTable: ProductDto[];
    comparison: { soldData: number[]; stockData: number[]; productsName: string[]; Labels: string[] };
    categoriesComparison: { categorias: Categoria[]; count: number[] };
}> {
    constructor(private readonly prisma: PrismaService) { }

    report: {
        dataTable: ProductDto[];
        dataGraphicOne: { soldData: number[]; stockData: number[]; productsName: string[]; Labels: string[] };
        dataGraphicTwo: { categorias: Categoria[]; count: number[] };
    }

    async consultModule(): Promise<ProductDto[]> {
        const productData = await this.prisma.product.findMany({
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

    makeStadistics(data: ProductReportDto[]): { comparisonData: { soldData: number[]; stockData: number[]; productsName: string[]; Labels: string[] }; mostSoldByCategory: { categorias: Categoria[]; count: number[] } } {
        data.map(product => {
            product.MostSoldProductByCategory = this.getMostSoldProductByCategory(data, product.category);
            product.inventoryStatus = this.getInventoryStatus(product);
        })
        const comparisonData = this.getcomparitionstockandsold(data);
        const mostSoldByCategory = this.getMostSoldByCategory(data);
        return { comparisonData, mostSoldByCategory }
    }

    generateReport(dataTable: ProductDto[], stadistics: {comparison: { soldData: number[]; stockData: number[]; productsName: string[]; Labels: string[] }; categoriesComparison: { categorias: Categoria[]; count: number[] }}): void {
        this.report.dataTable = dataTable;
        this.report.dataGraphicOne = stadistics.comparison;
        this.report.dataGraphicTwo = stadistics.categoriesComparison;
    }

    getreport(): any {
        return this.report
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

    getMostSoldByCategory(productData: ProductDto[]): { categorias: Categoria[]; count: number[] } {
        if (!productData || productData.length === 0) {
            return { categorias: [], count: [] };
        }
        const cat: Categoria[] = ["Electrónicos", "Mobiliario", "Accesorios"];
        const categorias: Categoria[] = [];
        const ventas: number[] = [];
        cat.forEach((categoria) => {
            const productsInCategory = productData.filter((p) => p.category === categoria);
            if (productsInCategory.length > 0) {
                const mostSold = productsInCategory.reduce((prev, current) =>
                    prev.sold > current.sold ? prev : current
                );
                categorias.push(categoria);
                ventas.push(mostSold.sold);
            }
        });

        return { categorias, count: ventas };
    }


}