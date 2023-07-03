import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { TransformResponseInterceptor } from '@common/interceptors/transform-response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppConfiguration } from 'app.configuration';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<AppConfiguration, true> = app.get(ConfigService<AppConfiguration, true>);
  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Test task example')
    .setDescription('The test task API description')
    .setVersion('1.0')
    .addTag('task')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
