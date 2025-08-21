import { PaymentDto } from "src/dto/payment.dto";
import { ProductDto, ProductReportDto } from "src/dto/product.dto";
import { UserDto } from "src/dto/user.dto";

export interface Report {
    users: UserDto[];
    payments: PaymentDto[];
    products: ProductReportDto[];
    consultModule(): {};
    makeStadistics(): {};
    generateReport(): void;
}