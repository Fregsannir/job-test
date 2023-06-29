import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppConfiguration } from 'app.configuration';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<AppConfiguration, true> = app.get(
    ConfigService<AppConfiguration, true>,
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
