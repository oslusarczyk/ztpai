import { Injectable, NotFoundException } from '@nestjs/common';
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
        ...(brand && {
          brand: {
            brand_name: brand,
          },
        }),
        ...(seats && { seats_available: seats }),
        price_per_day: {
          ...(minPrice && { gte: minPrice }),
          ...(maxPrice && { lte: maxPrice }),
        },
        ...(location && {
          cars_locations: {
            some: {
              location: {
                location_id: location,
              },
            },
          },
        }),
      },
    });

    return cars.map((car) => ({
      car_id: String(car.car_id),
      model: car.model,
      price_per_day: car.price_per_day,
      seats_available: car.seats_available,
      photo: car.photo,
      production_year: car.production_year,
      car_description: car.car_description,
    }));
  }

  async getMostPopularCars(): Promise<CarDto[]> {
    const cars = await this.prisma.car.findMany({
      include: {
        _count: {
          select: { reservations: true },
        },
      },
      orderBy: {
        reservations: {
          _count: 'desc',
        },
      },
      take: 3,
    });

    return cars.map((car) => ({
      car_id: car.car_id,
      model: car.model,
      price_per_day: car.price_per_day,
      seats_available: car.seats_available,
      photo: car.photo,
      production_year: car.production_year,
      car_description: car.car_description,
    }));
  }

  async getCarById(id: string): Promise<CarDto> {
    const car = await this.prisma.car.findUnique({
      where: { car_id: id },
      include: {
        cars_locations: {
          include: {
            location: true,
          },
        },
        brand: true,
      },
    });

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    // Mapujemy do CarDto (przykład – dostosuj do swoich pól):
    const result: CarDto = {
      car_id: car.car_id,
      model: car.model,
      price_per_day: car.price_per_day,
      seats_available: car.seats_available,
      photo: car.photo,
      production_year: car.production_year,
      car_description: car.car_description,
      brand: car.brand.brand_name,
      location: car.cars_locations.map(
        (carLocation) => carLocation.location.location_name,
      ),
    };

    return result;
  }

  async addCar(carDto: CarDto, locations_id: string[]): Promise<CarDto> {
    const newCar = await this.prisma.car.create({
      data: {
        brand_id: carDto.brand_id,
        model: carDto.model,
        price_per_day: carDto.price_per_day,
        seats_available: carDto.seats_available,
        photo: carDto.photo,
        production_year: carDto.production_year,
        car_description: carDto.car_description,
        cars_locations: {
          create: locations_id.map((locId) => ({
            location_id: locId,
          })),
        },
      },
    });

    return {
      car_id: newCar.car_id,
      model: newCar.model,
      price_per_day: newCar.price_per_day,
      seats_available: newCar.seats_available,
      photo: newCar.photo,
      production_year: newCar.production_year,
      car_description: newCar.car_description,
    };
  }
}
