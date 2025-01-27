import { Controller, Get, Param } from '@nestjs/common';
import { LocationsService } from './locations.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LocationDto } from './dto/location.dto';

@ApiTags('Locations')
@ApiBearerAuth()
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all locations' })
  @ApiResponse({
    status: 200,
    description: 'List of all locations.',
    type: [LocationDto],
  })
  getAllLocations() {
    return this.locationsService.getAllLocations();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get locations by car' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the car',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'List of locations associated with the specified car.',
    type: [LocationDto],
  })
  getLocationsByCar(@Param('id') id: string) {
    return this.locationsService.getLocationsByCar(id);
  }
}
