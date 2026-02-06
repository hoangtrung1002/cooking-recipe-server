import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ignore extra fields from body
      forbidNonWhitelisted: true, // throw an error for extra fields
      transform: true, // convert plain object to instance of DTO
      // transformOptions: { enableImplicitConversion: true }, // allows automatic conversion based on DTO types.
    }),
  ); // apply global pipe
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = configService.get<string>('PORT');
  await app.listen(port ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
