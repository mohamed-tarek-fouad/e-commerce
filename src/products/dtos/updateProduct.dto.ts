import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
export class UpdateProductDto {
  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(2)
  description: string;
  @IsOptional()
  @IsNotEmpty()
  price: string;
  @IsOptional()
  @IsNotEmpty()
  quantity: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  category: string;
}
