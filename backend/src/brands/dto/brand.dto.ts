import { ApiProperty } from '@nestjs/swagger';

export class BrandDto {
  @ApiProperty({
    description: 'fd61a120-08dc-4928-b240-41a1ea620028',
    example: 'brand123',
  })
  brand_id: string;

  @ApiProperty({
    description: 'nazwa marki',
    example: 'Toyota',
  })
  brand_name: string;
}
