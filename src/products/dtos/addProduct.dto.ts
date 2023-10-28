import {
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
export class AddProductDto {
  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(2)
  description: string;
  @IsNotEmpty()
  price: string;
  @IsNotEmpty()
  quantity: string;
  @IsNotEmpty()
  @IsString()
  category: string;
}
