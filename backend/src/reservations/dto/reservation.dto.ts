import { ApiProperty } from '@nestjs/swagger';

export class ReservationDto {
  @ApiProperty({
    description: 'ID rezerwacji',
    example: '3b783bc4-9409-49d0-a62c-8d7ad5fad2e9',
  })
  reservation_id: string;

  @ApiProperty({
    description: 'ID użytkownika który zrobił rezerwacje',
    example: '4ef57ee2-3400-487c-b665-fb6568ff1cb6',
  })
  user_id: string;

  @ApiProperty({
    description: 'ID zarezerwowanego samochodu',
    example: 'f534f5a7-58f2-495b-bada-26b93d7c0798',
  })
  car_id: string;

  @ApiProperty({
    description: 'ID lokalizacji gdzie zarezerwowano samochód',
    example: 'e820a613-e748-4f3a-995e-e794218f7ecc',
  })
  location_id: string;

  @ApiProperty({
    description: 'Początek rezerwacji',
    example: '2025-01-01T12:00:00Z',
  })
  reservation_start_date: Date;

  @ApiProperty({
    description: 'Koniec rezerwacji',
    example: '2025-01-05T12:00:00Z',
  })
  reservation_end_date: Date;

  @ApiProperty({
    description: 'Cena rezerwacji',
    example: 500,
    required: false,
  })
  reservation_price?: number;

  @ApiProperty({
    description: 'Status rezerwacji',
    example: 'pending',
    enum: ['pending', 'cancelled', 'confirmed'],
  })
  reservation_status: 'pending' | 'cancelled' | 'confirmed';
}
