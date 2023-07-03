import { PaginationQueryDto, PaginationResultDto } from '@common/dto/pagination.dto';
import { InternalError } from '@common/errors';
import { isLeft, left, right } from '@common/libs/either';
import { EntityID, ServiceReturn } from '@common/types';
import { HashString } from '@cryptor/types';
import { PasswordCryptorUseCase, PasswordCryptorUseCaseSymbol } from '@cryptor/use-cases/password-cryptor.use-case';
import { Inject, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { FindUserByAttributesDto } from '@users/dto/find-user.dto';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { User } from '@users/entities/user.entity';
import { CannotCreateUserError } from '@users/errors/cannot-create-user.error';
import { CannotLoadUsersError } from '@users/errors/cannot-load-users.error';
import { EmailAndPhoneWasNotProvidedError } from '@users/errors/email-and-phone-was-not-provided.error';
import { UserAlreadyExistsError } from '@users/errors/user-already-exists.error';
import { UserNotFoundError } from '@users/errors/user-not-found.error';
import { Op } from 'sequelize';
import { Repository } from 'sequelize-typescript';
import { UsersServiceUseCase } from '../use-cases/users-service.use-case';

export class UsersService implements UsersServiceUseCase {
  private readonly _logger: Logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User) private readonly _usersRepository: Repository<User>,
    @Inject(PasswordCryptorUseCaseSymbol)
    private readonly _cryptorService: PasswordCryptorUseCase,
  ) {}

  private _constructWhereClause<T extends {} = Record<string, unknown>>(attributes: T): Record<string, unknown> {
    return Object.entries(attributes)
      .map<Record<string, unknown>>(([key, value]: [string, unknown]) => ({
        [key]: typeof value === 'string' ? { [Op.iLike]: `%${value}%` } : value,
      }))
      .reduce((object: Record<string, unknown>, item: Record<string, unknown>) => Object.assign(object, item), {});
  }

  public async findAll(
    findUserDto?: FindUserByAttributesDto,
    paginationQueryDto?: PaginationQueryDto,
  ): Promise<ServiceReturn<PaginationResultDto<User>>> {
    try {
      const { limit, order }: PaginationQueryDto = paginationQueryDto;
      const offset: number = paginationQueryDto.skip;
      return await this._usersRepository
        .findAndCountAll({
          where: findUserDto ? this._constructWhereClause(findUserDto) : {},
          raw: true,
          limit: limit,
          offset: offset,
          order: [['createdAt', order]],
        })
        .then<ServiceReturn<PaginationResultDto<User>>>(({ rows, count }) =>
          right(new PaginationResultDto(paginationQueryDto, count, rows)),
        );
    } catch (error) {
      this._logger.error(error);
      return left(new CannotLoadUsersError());
    }
  }

  public async findOne(findUserDto: FindUserByAttributesDto | EntityID): Promise<ServiceReturn<User>> {
    try {
      const user: User = await this._usersRepository.findOne({
        where:
          findUserDto instanceof FindUserByAttributesDto
            ? this._constructWhereClause(findUserDto)
            : { id: findUserDto },
        raw: true,
      });

      return !user ? left(new UserNotFoundError(findUserDto)) : right(user);
    } catch (error) {
      this._logger.error(error);
      return left(new CannotLoadUsersError());
    }
  }

  public async create(createUserDto: CreateUserDto): Promise<ServiceReturn<User>> {
    try {
      const isEmailOrPhoneExist: boolean = !!(createUserDto.email || createUserDto.phone);
      if (!isEmailOrPhoneExist) {
        return left(new EmailAndPhoneWasNotProvidedError());
      }

      const exists: number = await this._usersRepository.count({
        where: this._constructWhereClause({ email: createUserDto?.email, phone: createUserDto?.phone }),
      });
      if (!!exists) {
        return left(new UserAlreadyExistsError());
      }

      const passwordHash: ServiceReturn<HashString> = await this._cryptorService.hash(createUserDto.password);
      if (isLeft(passwordHash)) {
        return passwordHash;
      }

      return await this._usersRepository
        .create({ ...createUserDto, password: passwordHash.right }, { raw: true })
        .then<ServiceReturn<User>>((user: User) => right(user.dataValues as User));
    } catch (error) {
      this._logger.error(error);
      return left(new CannotCreateUserError());
    }
  }

  public async update(id: EntityID, updateUserDto: UpdateUserDto): Promise<ServiceReturn<User>> {
    try {
      const existsWithId: number = await this._usersRepository.count({
        where: { id },
      });
      if (!!existsWithId) {
        return left(new UserNotFoundError(id));
      }

      const existsWithCredentials: number = await this._usersRepository.count({
        where: this._constructWhereClause({ email: updateUserDto.email, phone: updateUserDto.phone }),
      });
      if (!!existsWithCredentials) {
        return left(new UserAlreadyExistsError());
      }

      return await this._usersRepository
        .update(updateUserDto, {
          where: { id },
          returning: true,
        })
        .then<ServiceReturn<User>>(([_, user]: [number, User[]]) => right(user[0].dataValues as User));
    } catch (error) {
      this._logger.error(error);
      return left(new InternalError());
    }
  }

  public async delete(id: EntityID): Promise<ServiceReturn<void>> {
    try {
      const exists: number = await this._usersRepository.count({
        where: { id },
      });
      if (!!exists) {
        return left(new UserNotFoundError(id));
      }

      return await this._usersRepository
        .destroy({
          where: { id },
        })
        .then<ServiceReturn<void>>((_: number) => right(undefined));
    } catch (error) {
      this._logger.error(error);
      return left(new InternalError());
    }
  }
}
