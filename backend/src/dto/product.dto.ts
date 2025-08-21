import { IsNotEmpty, IsString } from "class-validator";

export class ProductDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    stock: number;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    sold: number;

    @IsNotEmpty()
    createdAt: Date;
}