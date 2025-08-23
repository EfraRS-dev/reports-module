import { IsNotEmpty, IsString } from "class-validator";
import { ProductDto } from "./product.dto";

export class PaymentDto {
    @IsNotEmpty()
    @IsString()
    usuario: string;

    @IsNotEmpty()
    value: number;

    @IsNotEmpty()
    createdAt: Date;

    @IsNotEmpty()
    @IsString()
    status: string;

    products: ProductDto[];
}