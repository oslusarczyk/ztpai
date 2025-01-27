import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class FilterCarsDto {
  @ApiPropertyOptional({
    description: 'ID lokalizacji',
    example: 'eeaedb14-a7e2-43f5-acf0-2b6d2ba00365',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    description: 'Nazwa marki samochodu',
    example: 'Toyota',
  })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({
    description: 'Liczba miejsc siedzących',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  seats?: number;

  @ApiPropertyOptional({
    description: 'Cena minimalna za dzień',
    example: 30,
  })
  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Cena maksymalna za dzień',
    example: 100,
  })
  @IsOptional()
  @IsNumber()
  maxPrice?: number;
}
