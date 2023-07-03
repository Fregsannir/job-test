import { EmailAndPhoneWasProvidedError } from '@auth/errors/email-and-phone-provided.error';
import { EmailOrPhoneWasNotProvidedError } from '@auth/errors/email-or-phone-was-not-provided.error';
import { UnauthorizedError } from '@common/errors';
import { isLeft, isRight, left, right } from '@common/libs/either';
import { ServiceReturn } from '@common/types';
import { PasswordCryptorUseCase, PasswordCryptorUseCaseSymbol } from '@cryptor/use-cases/password-cryptor.use-case';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@users/entities/user.entity';
import { UsersServiceUseCase, UsersServiceUseCaseSymbol } from '@users/use-cases/users-service.use-case';
import { AccessTokenDto } from '../dto/access-token.dto';
import { PayloadDto } from '../dto/payload.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { AuthServiceUseCase } from '../use-cases/auth.use-case';

@Injectable()
export class AuthService implements AuthServiceUseCase {
  private readonly _logger: Logger = new Logger(AuthService.name);

  constructor(
    @Inject() private readonly _jwtService: JwtService,
    @Inject(UsersServiceUseCaseSymbol) private readonly _usersService: UsersServiceUseCase,
    @Inject(PasswordCryptorUseCaseSymbol) private readonly _passwordCryptorService: PasswordCryptorUseCase,
  ) {}

  public async validateUser(credentials: SignInDto): Promise<ServiceReturn<Omit<User, 'password'>>> {
    try {
      const { password, ...emailOrPhone } = credentials;
      if (JSON.stringify(emailOrPhone) === '{}') {
        return left(new EmailOrPhoneWasNotProvidedError());
      }
      if (emailOrPhone.email && emailOrPhone.phone) {
        return left(new EmailAndPhoneWasProvidedError());
      }

      const userEither: ServiceReturn<User> = await this._usersService.findOne(emailOrPhone);
      if (isRight(userEither)) {
        const comparePasswordEither: ServiceReturn<boolean> = await this._passwordCryptorService.compare(
          password,
          userEither.right.password,
        );
        if (isLeft(comparePasswordEither) || !comparePasswordEither.right) {
          return left(new UnauthorizedError());
        }
        return userEither;
      }

      return left(new UnauthorizedError());
    } catch (error) {
      this._logger.error(error);
      return left(new UnauthorizedError());
    }
  }

  public async login(user: Omit<User, 'password'>): Promise<ServiceReturn<AccessTokenDto>> {
    try {
      const payload: PayloadDto = { phone: user.phone, email: user.email, sub: user.id };
      return right(new AccessTokenDto(this._jwtService.sign(payload)));
    } catch (error) {
      this._logger.error(error);
      return left(new UnauthorizedError());
    }
  }
}
