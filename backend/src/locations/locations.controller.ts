import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationDto } from './dto/location.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  getAllLocations() {
    return this.locationsService.getAllLocations();
  }

  @Get(':id')
  getLocationsByCar(@Param('id') id: string) {
    return this.locationsService.getLocationsByCar(id);
  }
}
