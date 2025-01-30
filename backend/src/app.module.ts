import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { BrandsModule } from './brands/brands.module';
import { LocationsModule } from './locations/locations.module';
import { CarsModule } from './cars/cars.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ReddisCacheModule } from './redis/redis.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    BrandsModule,
    LocationsModule,
    CarsModule,
    ReservationsModule,
    ReddisCacheModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
