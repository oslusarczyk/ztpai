import { Injectable, NotFoundException } from '@nestjs/common';
import { CarDto } from './dto/car.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { RedisService } from '@/redis/redis.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CarsService {
  private readonly UPLOAD_DIRECTORY = path.join(
    __dirname,
    '../../../public/src/assets',
  );

  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {
    if (!fs.existsSync(this.UPLOAD_DIRECTORY)) {
      fs.mkdirSync(this.UPLOAD_DIRECTORY, { recursive: true });
    }
  }

  async getAllCars(
    location?: string,
    brand?: string,
    seats?: number,
    minPrice?: number,
    maxPrice?: number,
  ): Promise<CarDto[]> {
    const parsedMinPrice = minPrice ? Number(minPrice) : undefined;
    const parsedMaxPrice = maxPrice ? Number(maxPrice) : undefined;
    const cars = await this.prisma.car.findMany({
      where: {
        ...(brand && {
          brand: {
            brand_name: brand,
          },
        }),
        ...(seats && { seats_available: seats }),
        price_per_day: {
          ...(parsedMinPrice !== undefined && { gte: parsedMinPrice }),
          ...(parsedMaxPrice !== undefined && { lte: parsedMaxPrice }),
        },
        ...(location && {
          cars_locations: {
            some: {
              location: {
                location_name: location,
              },
            },
          },
        }),
      },
      include: {
        brand: true,
        cars_locations: {
          include: {
            location: true,
          },
        },
      },
    });

    return cars.map((car) => ({
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
    }));
  }

  async getMostPopularCars(): Promise<CarDto[]> {
    const cars = await this.prisma.car.findMany({
      include: {
        _count: {
          select: { reservations: true },
        },
        cars_locations: {
          include: {
            location: true,
          },
        },
        brand: true,
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
      brand: car.brand.brand_name,
      location: car.cars_locations.map(
        (carLocation) => carLocation.location.location_name,
      ),
    }));
  }

  async getCarById(id: string): Promise<CarDto> {
    const cacheKey = `car_${id}`;
    const cachedCar = await this.redisService.get<CarDto>(cacheKey);
    if (cachedCar) {
      return cachedCar;
    }
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

    await this.redisService.set(cacheKey, result, 3600);

    return result;
  }

  async addCar(
    carDto: CarDto,
    locations_id: string[],
    file?: Express.Multer.File,
  ): Promise<CarDto> {
    let filePath = '';

    if (file) {
      filePath = `${file.filename}`;
    }
    const newCar = await this.prisma.car.create({
      data: {
        brand_id: carDto.brand_id,
        model: carDto.model,
        price_per_day: Number(carDto.price_per_day),
        seats_available: Number(carDto.seats_available),
        photo: filePath,
        production_year: Number(carDto.production_year),
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
