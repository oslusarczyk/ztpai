import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express'; // lub 'fastify', w zależności od użytego adaptera
import { CarsService } from './cars.service';
import { CarDto } from './dto/car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get()
  async getAllCars(@Req() request: Request): Promise<CarDto[]> {
    const location = request.query.location as string | undefined;
    const brand = request.query.brand as string | undefined;
    const seats = request.query.seats as string | undefined;
    const minPrice = request.query.minPrice as string | undefined;
    const maxPrice = request.query.maxPrice as string | undefined;
    console.log(request.query);
    console.log(location, brand, seats, minPrice, maxPrice);

    // const seatsNum = seats ? parseInt(seats, 10) : undefined;
    // const minPriceNum = minPrice ? parseInt(minPrice, 10) : undefined;
    // const maxPriceNum = maxPrice ? parseInt(maxPrice, 10) : undefined;

    return this.carsService.getAllCars(
      location,
      brand,
      // seatsNum,
      // minPriceNum,
      // maxPriceNum,
    );
  }

  // @Get('create')
}
