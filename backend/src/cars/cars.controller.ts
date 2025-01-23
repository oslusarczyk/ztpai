import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarDto } from './dto/car.dto';
import { FilterCarsDto } from './dto/filter-cars.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get()
  async getAllCars(@Body() carDto: FilterCarsDto): Promise<CarDto[]> {
    console.log(carDto);
    const location = carDto.location as string | undefined;
    const brand = carDto.brand as string | undefined;
    const seats = carDto.seats as number | undefined;
    const minPrice = carDto.minPrice as number | undefined;
    const maxPrice = carDto.maxPrice as number | undefined;

    return this.carsService.getAllCars(
      location,
      brand,
      seats,
      minPrice,
      maxPrice,
    );
  }

  @Get('most-popular')
  async getMostPopularCars() {
    return this.carsService.getMostPopularCars();
  }

  @Get(':id')
  async getCarById(@Param('id') id: string): Promise<CarDto> {
    return this.carsService.getCarById(id);
  }

  @Post()
  async addCar(@Body() body: any): Promise<CarDto> {
    const { locations, ...carDto } = body;
    return this.carsService.addCar(carDto, locations || []);
  }
}
