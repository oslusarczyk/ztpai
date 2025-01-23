import { IsNumber, IsString, IsOptional } from 'class-validator';

export class FilterCarsDto {
  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsNumber()
  seats?: number;

  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;
}
