import { PaymentDto } from "./payment.dto";
import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    createdAt: Date;

    @IsOptional()
    lastLoginAt: Date;

    @IsNotEmpty()
    payments: PaymentDto[];

    mostPurchasedCategory: string;

    paymentsQuantity: number;
}

