import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BrandsService } from './brands.service';
import { BrandDto } from './dto/brand.dto';

@ApiTags('Brands')
@ApiBearerAuth()
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  @ApiOperation({ summary: 'Pobierz listę wszystkich marek' })
  @ApiResponse({
    status: 200,
    description: 'Wszystkie marki.',
    type: [BrandDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  getAllBrands() {
    return this.brandsService.getAllBrands();
  }
}
