import { Injectable } from '@nestjs/common';
import { CarDto } from './dto/car.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return `This action returns all cars`;
  }

  async getAllCars(
    location?: string,
    brand?: string,
    seats?: number,
    minPrice?: number,
    maxPrice?: number,
  ): Promise<CarDto[]> {
    const cars = await this.prisma.car.findMany({
      where: {
        ...(brand && { brand_name: brand }),
        ...(seats && { seats_available: seats }),
        ...(minPrice && { price_per_day: { gte: minPrice } }),
        ...(maxPrice && { price_per_day: { lte: maxPrice } }),
        ...(location && {
          locations: {
            has: location,
          },
        }),
      },
    });

    return cars.map((car) => ({
      car_id: String(car.car_id), // w DTO to string, w bazie Int
      model: car.model,
      price_per_day: car.price_per_day,
      seats_available: car.seats_available,
      photo: car.photo,
      production_year: car.production_year,
      car_description: car.car_description,
    }));
  }
}
