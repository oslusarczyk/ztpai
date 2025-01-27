import { ApiProperty } from '@nestjs/swagger';

export class CarDto {
  @ApiProperty({
    description: 'ID samochodu',
    example: '15e4ad25-1f9a-41bb-88dc-f241c1f2aa21',
  })
  car_id: string;

  @ApiProperty({
    description: 'ID marki samochodu',
    example: 'db0914a6-5733-4e62-aaf4-d83376b76d23',
    required: false,
  })
  brand_id?: string;

  @ApiProperty({
    description: 'Model samochodu',
    example: 'Corolla',
  })
  model: string;

  @ApiProperty({
    description: 'Cena wynajmu',
    example: 50,
  })
  price_per_day: number;

  @ApiProperty({
    description: 'Liczba dostępnych miejsc',
    example: 5,
  })
  seats_available: number;

  @ApiProperty({
    description: 'Adres zdjęcia samochodu',
    example: 'photo.jpg',
  })
  photo: string;

  @ApiProperty({
    description: 'Rok produkcji samochodu',
    example: 2020,
  })
  production_year: number;

  @ApiProperty({
    description: 'Pełny opis samochodu',
    example: 'A comfortable family car with great fuel economy.',
  })
  car_description: string;

  @ApiProperty({
    description: 'Nazwa marki',
    example: 'Toyota',
    required: false,
  })
  brand?: string;

  @ApiProperty({
    description: 'Lista lokaliacji',
    example: ['Kraków', 'Toruń'],
    required: false,
  })
  location?: string[];
}
