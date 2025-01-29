import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { CarDto } from './dto/car.dto';
import { FilterCarsDto } from './dto/filter-cars.dto';
import { AdminGuard } from '@/guards/admin.guard';

@ApiTags('Cars')
@ApiBearerAuth()
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  @ApiOperation({ summary: 'Pobierz wszystkie samochody zgodnie z filtrem' })
  @ApiResponse({
    status: 200,
    description: 'Lista samochodów spełniająca kryteria filtrowania.',
    type: [CarDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Zły rodzaj danych',
  })
  @ApiQuery({
    name: 'location',
    description: 'Lokalizacja samochodu',
    required: false,
  })
  @ApiQuery({
    name: 'brand',
    description: 'Marka samochodu',
    required: false,
  })
  @ApiQuery({
    name: 'seats',
    description: 'Liczba miejsc siedzących',
    required: false,
  })
  @ApiQuery({
    name: 'minPrice',
    description: 'Minimalna cena',
    required: false,
  })
  @ApiQuery({
    name: 'maxPrice',
    description: 'Maksymalna cena',
    required: false,
  })
  async getAllCars(
    @Query('location') location?: string,
    @Query('brand') brand?: string,
    @Query('seats') seats?: number,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ): Promise<CarDto[]> {
    return this.carsService.getAllCars(
      location,
      brand,
      seats,
      minPrice,
      maxPrice,
    );
  }
  @Get('most-popular')
  @ApiOperation({ summary: 'Pobierz 3 najpopularniejsze samochody' })
  @ApiResponse({
    status: 200,
    description: 'Lista najpopularniejszych samochodów.',
    type: [CarDto],
  })
  async getMostPopularCars() {
    return this.carsService.getMostPopularCars();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz szczegóły samochodu z danym ID' })
  @ApiResponse({
    status: 200,
    description: 'Szczegóły danego samochodu',
    type: CarDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Nie znaleziono takiego samochodu.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID samochodu',
    type: String,
  })
  async getCarById(@Param('id') id: string): Promise<CarDto> {
    return this.carsService.getCarById(id);
  }

  @UseGuards(AdminGuard)
  @Post()
  @ApiOperation({ summary: 'Dodawanie nowego auta (admin)' })
  @ApiResponse({
    status: 201,
    description: 'Nowe auto zostało dodane.',
    type: CarDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Brak uprawnień do wykonania tej operacji.',
  })
  @ApiResponse({
    status: 400,
    description: 'Nieprawidłowe dane.',
  })
  @ApiBody({
    description: 'Szczegóły nowego auta.',
    type: CarDto,
  })
  async addCar(@Body() body: any): Promise<CarDto> {
    const { locations, ...carDto } = body;
    return this.carsService.addCar(carDto, locations || []);
  }
}
