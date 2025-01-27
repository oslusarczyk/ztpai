import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @ApiProperty({
    description: 'ID lokalizacji',
    example: '98e1e623-457d-471c-a699-3e2e03dab143',
  })
  location_id: string;

  @ApiProperty({
    description: 'Nazwa lokalizacji',
    example: 'Kraków',
  })
  location_name: string;
}
