import { Controller, Get, Put, Post, Body, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { ReservationDto } from './dto/reservation.dto';
import { ReservationStatus } from '@prisma/client';

@ApiTags('Reservations')
@ApiBearerAuth()
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  @ApiOperation({ summary: 'Pobierz rezerwacji po ID użytkownika i statusie' })
  @ApiQuery({
    name: 'user_id',
    description: 'ID użytkownika',
    required: true,
  })
  @ApiQuery({
    name: 'status',
    description: 'Status rezerwacji',
    enum: ['pending', 'cancelled', 'confirmed'],
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista rezerwacji o podanym statusie uzywkownika.',
    type: [ReservationDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Złe dane.',
  })
  async getReservationsByUserId(
    @Query('user_id') user_id: string,
    @Query('status') status: ReservationStatus,
  ) {
    if (!user_id || !status) {
      throw new Error('Missing user_id or status');
    }
    return this.reservationsService.getReservationsByUserId(user_id, status);
  }

  @Get('pending')
  @ApiOperation({ summary: 'Pobierz wszystkie oczekujące rezerwacje' })
  @ApiResponse({
    status: 200,
    description: 'Lista oczekujących rezerwacji',
    type: [ReservationDto],
  })
  async getPendingReservations() {
    return this.reservationsService.getPendingReservations();
  }

  @Post()
  @ApiOperation({ summary: 'Stwórz nową rezerwacje' })
  @ApiBody({
    description: 'Szczegóły rezerwacji',
    schema: {
      example: {
        reservation_start_date: '2021-01-01T12:00:00.000Z',
        reservation_end_date: '2021-01-02T12:00:00.000Z',
        location_id: '3b783bc4-9409-49d0-a62c-8d7ad5fad2e9',
        car_id: '3b783bc4-9409-49d0-a62c-8d7ad5fad2e9',
        user_id: '3b783bc4-9409-49d0-a62c-8d7ad5fad2e9',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Stworzona rezerwacja',
    type: ReservationDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  async addReservation(@Body() body: ReservationDto) {
    const {
      reservation_start_date,
      reservation_end_date,
      location_id,
      car_id,
      user_id,
    } = body;
    if (
      !reservation_start_date ||
      !reservation_end_date ||
      !location_id ||
      !car_id ||
      !user_id
    ) {
      throw new Error('Missing required fields');
    }
    return this.reservationsService.addReservation(
      reservation_start_date.toString(),
      reservation_end_date.toString(),
      location_id,
      car_id,
      user_id,
    );
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Zaktualizuj status danej rezerwacji' })
  @ApiParam({
    name: 'id',
    description: 'ID rezerwacji',
  })
  @ApiBody({
    description: 'Nowy status rezerwacji',
    schema: {
      example: {
        id: '3b783bc4-9409-49d0-a62c-8d7ad5fad2e9',
        action: 'confirmed',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Zaktualizowano status rezerwacji',
    type: ReservationDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Złe dane',
  })
  async updateReservationStatus(
    @Param('id') id: string,
    @Body('action') reservation_status: ReservationStatus,
  ) {
    if (!id || !reservation_status) {
      throw new Error('Missing reservation ID or action');
    }
    return this.reservationsService.updateReservationStatus(
      id,
      reservation_status,
    );
  }
}
