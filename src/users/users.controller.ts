import { BaseController } from '@common/controller';
import { PaginationQueryDto, PaginationResultDto } from '@common/dto/pagination.dto';
import { ErrorResponse } from '@common/response/error.response';
import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindUserByAttributesDto, FindUserByIdDto } from './dto/find-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserMapper } from './mapper/user.mapper';
import { UsersService } from './services/users.service';
import { UsersServiceUseCaseSymbol } from './use-cases/users-service.use-case';

@ApiTags('Users Controller')
@Controller('users')
export class UsersController extends BaseController {
  constructor(@Inject(UsersServiceUseCaseSymbol) private readonly _usersService: UsersService) {
    super();
  }

  @ApiOkResponse({
    description: 'Returns all users.',
    schema: {
      properties: {
        statusCode: { type: 'number', nullable: false, default: 200 },
        data: {
          items: {
            properties: {
              name: { type: 'string', nullable: true },
              surname: { type: 'string', nullable: true },
              email: { type: 'string', nullable: true },
              phone: { type: 'string', nullable: true },
              createdAt: { type: 'string', nullable: true },
              updatedAt: { type: 'string', nullable: true },
            },
          },
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: 'Internal server error response.',
  })
  @Get()
  public async findAll(
    @Query() findUserDto?: FindUserByAttributesDto,
    @Query() paginationQueryDto?: PaginationQueryDto,
  ) {
    return await this.callbackHandler<PaginationResultDto<User>>(
      this._usersService.findAll.bind(this._usersService, findUserDto, paginationQueryDto),
    ).then<PaginationResultDto<UserDto>>((paginationResultDto: PaginationResultDto<User>) => ({
      ...paginationResultDto,
      items: paginationResultDto.items.map(UserMapper.mapEntityToDto.bind(this)),
    }));
  }

  @ApiOkResponse({
    description: 'Returns user by the provided id.',
    schema: {
      properties: {
        statusCode: { type: 'number', nullable: false, default: 200 },
        message: { type: 'string', nullable: true },
        data: {
          properties: {
            name: { type: 'string', nullable: true },
            surname: { type: 'string', nullable: true },
            email: { type: 'string', nullable: true },
            phone: { type: 'string', nullable: true },
            createdAt: { type: 'string', nullable: true },
            updatedAt: { type: 'string', nullable: true },
          },
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: 'Internal server error response.',
  })
  @Get(':id')
  public async findById(@Param() { id }: FindUserByIdDto) {
    return await this.callbackHandler<User>(this._usersService.findOne.bind(this._usersService, id)).then<UserDto>(
      UserMapper.mapEntityToDto.bind(this),
    );
  }
}
