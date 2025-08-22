import { Report } from "./interfaz";
import { UserDto } from "src/dto/user.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

type Categoria = "Electrónicos" | "Mobiliario" | "Accesorios";

@Injectable()
export class UsersReportBuilder implements Report<{
    dataTable: UserDto[];
    dataGraphicOne: { id: number; category: string; percent: number }[];
    dataGraphicTwo: { range: string[]; count: number[] };
}> {
    constructor(private readonly prisma: PrismaService) { 
        this.report = {
            dataTable: [],
            dataGraphicOne: [],
            dataGraphicTwo: { range: [], count: [] }
        };
     }

    report: {
        dataTable: UserDto[];
        dataGraphicOne: { id: number; category: string; percent: number }[];
        dataGraphicTwo: { range: string[]; count: number[] };
    }

    async consultModule(): Promise<UserDto[]> {
        const usersData = await this.prisma.user.findMany({
            select: {
                name: true,
                email: true,
                createdAt: true,
                lastLoginAt: true,
                payments: {
                    select: {
                        value: true,
                        products: {
                            select: {
                                product: {
                                    select: {
                                        category: true
                                    }

                                }

                            }

                        }
                    }

                }
            }
        });

        return usersData;
    }

    makeStadistics(data: UserDto[]): { percents: { id: number; category: string; percent: number }[]; paymentQuantitiesRange: { range: string[]; count: number[] } } {
        data.map(user => {
            user.mostPurchasedCategory = this.getMostPurchasedCategoryByUser(user);
        })
        const percents = this.getPercentBycategory(data);
        data.map(user => {
            user.paymentsQuantity = this.getPaymentsQuantityByUser(user);
        });
        const paymentQuantitiesRange = this.getPaymentQuantitiesRange(data);
        return {
            percents,
            paymentQuantitiesRange
        }
    }

    generateReport(dataTable: UserDto[], stadistics: { percents: { id: number; category: string; percent: number }[]; paymentQuantitiesRange: { range: string[]; count: number[] } }) {
        this.report.dataTable = dataTable;
        this.report.dataGraphicOne = stadistics.percents;
        this.report.dataGraphicTwo = stadistics.paymentQuantitiesRange;
    }

    getreport(): {
        dataTable: UserDto[];
        dataGraphicOne: { id: number; category: string; percent: number }[];
        dataGraphicTwo: { range: string[]; count: number[] };
    } {
        return this.report;
    }

    getMostPurchasedCategoryByUser(data: UserDto): string {

        function isCategoria(cat: string): cat is Categoria {
            return ["Electrónicos", "Mobiliario", "Accesorios"].includes(cat);
        }
        const categoryCount: Record<Categoria, number> = { "Electrónicos": 0, "Mobiliario": 0, "Accesorios": 0 };
        data.payments.forEach(payment => {
            payment.products.forEach(product => {
                if (isCategoria(product.product.category)) {
                    categoryCount[product.product.category as Categoria]++;
                }

            })
        });
        return Object.keys(categoryCount).reduce((a, b) => categoryCount[a as Categoria] > categoryCount[b as Categoria] ? a : b);
    }

    getPercentBycategory(data: UserDto[]): { id: number; category: string; percent: number }[] {
        const categoryCount: Record<Categoria, number> = { "Electrónicos": 0, "Mobiliario": 0, "Accesorios": 0 };
        const percents: { id: number; category: string; percent: number }[] = [];
        let id = 0;
        data.forEach(user => {
            categoryCount[user.mostPurchasedCategory as Categoria]++;
        });
        Object.keys(categoryCount).forEach((category) => {
            const percent = (categoryCount[category as Categoria] / data.length) * 100;
            percents.push({ id, category, percent });
            id++;
        });
        return percents;
    }

    getPaymentsQuantityByUser(data: UserDto): number {
        return data.payments.length;
    }

    getPaymentQuantitiesRange(data: UserDto[]): { range: string[]; count: number[] } {
        const ranges = ["0", "1-5", "6-10", "11-15", "16-20", "21+"];
        const rangeCounts: Record<string, number> = { "0": 0, "1-5": 0, "6-10": 0, "11-15": 0, "16-20": 0, "21+": 0 };
        data.forEach(user => {
            const quantity = user.paymentsQuantity;
            if (quantity === undefined) {
                return;
            }
            if (quantity === 0) {
                rangeCounts["0"]++;
            } else if (quantity <= 5) {
                rangeCounts["1-5"]++;
            } else if (quantity <= 10) {
                rangeCounts["6-10"]++;
            } else if (quantity <= 15) {
                rangeCounts["11-15"]++;
            } else if (quantity <= 20) {
                rangeCounts["16-20"]++;
            } else {
                rangeCounts["21+"]++;
            }
        });
        const quantities = ranges.map(range => rangeCounts[range]);
        return { range: ranges, count: quantities };
    }

}