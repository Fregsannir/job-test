import { PaginationQueryDto, PaginationResultDto } from '@common/dto/pagination.dto';
import { EntityID, ServiceReturn } from '@common/types';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { FindUserByAttributesDto } from '@users/dto/find-user.dto';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { User } from '@users/entities/user.entity';

export const UsersServiceUseCaseSymbol: symbol = Symbol('UsersServiceUseCase');

export interface UsersServiceUseCase {
  findAll(
    findUserDto?: FindUserByAttributesDto,
    paginationQueryDto?: PaginationQueryDto,
  ): Promise<ServiceReturn<PaginationResultDto<User>>>;
  findOne(findUserDto: FindUserByAttributesDto | EntityID): Promise<ServiceReturn<User>>;
  create(createUserDto: CreateUserDto): Promise<ServiceReturn<User>>;
  update(id: EntityID, updateUserDto: UpdateUserDto): Promise<ServiceReturn<User>>;
  delete(id: EntityID): Promise<ServiceReturn<void>>;
}
