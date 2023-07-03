import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfiguration } from 'app.configuration';
import { PasswordCryptorService } from './services/password-cryptor.service';
import { PasswordCryptorUseCaseSymbol } from './use-cases/password-cryptor.use-case';

const providers: Provider[] = [
  {
    provide: PasswordCryptorUseCaseSymbol,
    useFactory: (configService: ConfigService<AppConfiguration, true>) => {
      return new PasswordCryptorService(configService.get<number>('APP_SALT_ROUNDS'));
    },
    inject: [ConfigService],
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class CryptorModule {}
