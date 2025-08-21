import { IsNotEmpty, IsString } from "class-validator";

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
}