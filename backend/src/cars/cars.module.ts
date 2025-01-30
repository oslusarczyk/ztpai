import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';
import { ReddisCacheModule } from '@/redis/redis.module';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      dest: path.join(__dirname, '../../../public/img/uploads/'),
    }),
    ReddisCacheModule,
  ],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
