import { CryptorModule } from '@cryptor/cryptor.module';
import { PasswordCryptorUseCase, PasswordCryptorUseCaseSymbol } from '@cryptor/use-cases/password-cryptor.use-case';
import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersServiceUseCase, UsersServiceUseCaseSymbol } from '@users/use-cases/users-service.use-case';
import { UsersModule } from '@users/users.module';
import { AppConfiguration } from 'app.configuration';
import { Algorithm } from 'jsonwebtoken';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthServiceUseCaseSymbol } from './use-cases/auth.use-case';

const providers: Provider[] = [
  {
    provide: AuthServiceUseCaseSymbol,
    useFactory: (
      jwtService: JwtService,
      findUserService: UsersServiceUseCase,
      passwordCryptorService: PasswordCryptorUseCase,
    ) => {
      return new AuthService(jwtService, findUserService, passwordCryptorService);
    },
    inject: [JwtService, UsersServiceUseCaseSymbol, PasswordCryptorUseCaseSymbol],
  },
  JwtStrategy,
];

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<AppConfiguration, true>) => {
        const algorithm: Algorithm = configService.get<Algorithm>('APP_JWT_ALGORITHM');
        const jwtOptions: JwtModuleOptions = {
          signOptions: {
            expiresIn: configService.get<string>('APP_JWT_EXPIRES_IN'),
            algorithm,
          },
        };

        if (algorithm.startsWith('HS')) {
          jwtOptions.secret = configService.get<string>('APP_JWT_SECRET');
        } else {
          jwtOptions.publicKey = configService.get<string>('APP_JWT_PUBLIC_KEY');
          jwtOptions.privateKey = configService.get<string>('APP_JWT_PRIVATE_KEY');
        }

        return { ...jwtOptions };
      },
      inject: [ConfigService],
    }),
    PassportModule,
    UsersModule,
    CryptorModule,
  ],
  controllers: [AuthController],
  providers: [...providers],
})
export class AuthModule {}
