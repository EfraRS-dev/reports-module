import { PaymentDto } from './payment.dto';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsOptional()
  lastLoginAt?: Date | null;

  @IsNotEmpty()
  payments: UserReportPaymentDto[];

  @IsOptional()
  mostPurchasedCategory?: string;

  @IsOptional()
  paymentsQuantity?: number;
}

export class UserReportPaymentDto {
  value: number;
  products: {
    product: {
      category: string;
    };
  }[];
}
