import { CryptorModule } from '@cryptor/cryptor.module';
import { PasswordCryptorUseCase, PasswordCryptorUseCaseSymbol } from '@cryptor/use-cases/password-cryptor.use-case';
import { Module, Provider } from '@nestjs/common';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { UsersServiceUseCaseSymbol } from './use-cases/users-service.use-case';
import { UsersController } from './users.controller';

const providers: Provider[] = [
  {
    provide: UsersServiceUseCaseSymbol,
    inject: [getModelToken(User), PasswordCryptorUseCaseSymbol],
    useFactory: (user: Repository<User>, cryptorService: PasswordCryptorUseCase) => {
      return new UsersService(user, cryptorService);
    },
  },
];

@Module({
  imports: [SequelizeModule.forFeature([User]), CryptorModule],
  providers: providers,
  controllers: [UsersController],
  exports: providers,
})
export class UsersModule {}
