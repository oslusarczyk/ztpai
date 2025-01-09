import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  });
  const config = new DocumentBuilder()
    .setTitle('SmartCar API')
    .setDescription('The SmartCar API description')
    .setVersion('1.0')
    .addTag('cars')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
