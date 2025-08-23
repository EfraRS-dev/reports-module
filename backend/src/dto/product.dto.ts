import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  sold: number;

  @IsNotEmpty()
  createdAt: Date;
}

export class ProductReportDto extends ProductDto {
  @IsNotEmpty()
  MostSoldProductByCategory: string | null;

  @IsNotEmpty()
  @IsString()
  inventoryStatus: string;
}
