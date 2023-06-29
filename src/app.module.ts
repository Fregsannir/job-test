import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppConfiguration, validate } from './app.configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: true,
      isGlobal: true,
      validate,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService<AppConfiguration, true>],
      useFactory: (configService: ConfigService<AppConfiguration, true>) => ({
        dialect: 'postgres',
        host: configService.get<string>('APP_DB_HOST'),
        port: configService.get<number>('APP_DB_PORT'),
        username: configService.get<string>('APP_DB_USERNAME'),
        password: configService.get<string>('APP_DB_PASSWORD'),
        database: configService.get<string>('APP_DB_NAME'),
        models: [`${__dirname}/**/entities/*.ts`],
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
