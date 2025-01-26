import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { BrandsModule } from './brands/brands.module';
import { LocationsModule } from './locations/locations.module';
import { CarsModule } from './cars/cars.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [UserModule, AuthModule, BrandsModule, LocationsModule, CarsModule, ReservationsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
