import { left, right } from '@common/libs/either';
import { ServiceReturn } from '@common/types';
import { HashString, SaltRounds } from '@cryptor/types';
import { Injectable, Logger } from '@nestjs/common';
import {
  compare as bcryptCompare,
  compareSync as bcryptCompareSync,
  hash as bcryptHash,
  hashSync as bcryptHashSync,
} from 'bcrypt';
import { CannotHashPassword } from '../errors/cannot-hash-password.error';
import { PasswordDoNotMatch } from '../errors/password-do-not-match.error';
import { PasswordCryptorUseCase } from '../use-cases/password-cryptor.use-case';

@Injectable()
export class PasswordCryptorService implements PasswordCryptorUseCase {
  private readonly _logger: Logger = new Logger(PasswordCryptorService.name);
  private readonly _saltRounds!: SaltRounds;

  constructor(saltRounds: SaltRounds) {
    this._saltRounds = saltRounds;
  }

  public async hash(plainPassword: string): Promise<ServiceReturn<HashString>> {
    try {
      const hashString: HashString = await bcryptHash(plainPassword, this._saltRounds);
      return right(hashString);
    } catch (error) {
      this._logger.error(error);
      return left(new CannotHashPassword());
    }
  }

  public hashSync(plainPassword: string): ServiceReturn<HashString> {
    try {
      const hashString: HashString = bcryptHashSync(plainPassword, this._saltRounds);
      return right(hashString);
    } catch (error) {
      this._logger.error(error);
      return left(new CannotHashPassword());
    }
  }

  public async compare(plainPassword: string, passwordHash: HashString): Promise<ServiceReturn<boolean>> {
    try {
      const isCorrect: boolean = await bcryptCompare(plainPassword, passwordHash);
      return right(isCorrect);
    } catch (error) {
      this._logger.error(error);
      return left(new PasswordDoNotMatch());
    }
  }

  public compareSync(plainPassword: string, passwordHash: HashString): ServiceReturn<boolean> {
    try {
      const isCorrect: boolean = bcryptCompareSync(plainPassword, passwordHash);
      return right(isCorrect);
    } catch (error) {
      this._logger.error(error);
      return left(new PasswordDoNotMatch());
    }
  }
}
