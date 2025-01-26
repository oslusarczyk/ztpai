import { Controller, Get, Put, Post, Body, Param, Query } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationDto } from './dto/reservation.dto';
import { ReservationStatus } from '@prisma/client';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
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
  async getPendingReservations() {
    return this.reservationsService.getPendingReservations();
  }

  @Post()
  async addReservation(@Body() body: any) {
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
      reservation_start_date,
      reservation_end_date,
      location_id,
      car_id,
      user_id,
    );
  }

  @Put(':id/status')
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
