import { BaseController } from '@common/controller';
import { ErrorResponse } from '@common/response/error.response';
import { Body, Controller, Delete, Get, Inject, Post, Put, Query, Req, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { UserDto } from '@users/dto/user.dto';
import { User } from '@users/entities/user.entity';
import { UserMapper } from '@users/mapper/user.mapper';
import { UsersServiceUseCase, UsersServiceUseCaseSymbol } from '@users/use-cases/users-service.use-case';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthorizedRequest } from './types/authorized-request.type';
import { AuthServiceUseCase, AuthServiceUseCaseSymbol } from './use-cases/auth.use-case';

@ApiBearerAuth()
@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(
    @Inject(UsersServiceUseCaseSymbol) private readonly _usersService: UsersServiceUseCase,
    @Inject(AuthServiceUseCaseSymbol) private readonly _authService: AuthServiceUseCase,
  ) {
    super();
  }

  @ApiCreatedResponse({
    description: 'Returns the created user.',
    schema: {
      properties: {
        statusCode: { type: 'number', nullable: false, default: 201 },
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
  @Post('sign-up')
  public async signUp(@Body() createUserDto: SignUpDto) {
    return await this.callbackHandler(this._usersService.create.bind(this._usersService, createUserDto)).then<UserDto>(
      UserMapper.mapEntityToDto.bind(this),
    );
  }

  @ApiOkResponse({
    description: 'Returns JWT access token. You should provide one of the properties: email or phone.',
    schema: {
      properties: {
        statusCode: { type: 'number', nullable: false, default: 200 },
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
  @Get('sign-in')
  public async signIn(@Query() signInDto: SignInDto) {
    const validateUser: Omit<User, 'password'> = await this.callbackHandler(
      this._authService.validateUser.bind(this._authService, signInDto),
    );
    return await this.callbackHandler(this._authService.login.bind(this._authService, validateUser));
  }

  @ApiOkResponse({
    description: 'Returns current user profile.',
    schema: {
      properties: {
        statusCode: { type: 'number', nullable: false, default: 200 },
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
  @UseGuards(JwtAuthGuard)
  @Get('me')
  public async me(@Request() { user }: AuthorizedRequest) {
    return await this.callbackHandler(this._usersService.findOne.bind(this._usersService, user.sub)).then<UserDto>(
      UserMapper.mapEntityToDto.bind(this),
    );
  }

  @ApiOkResponse({
    description: 'Returns current user profile.',
    schema: {
      properties: {
        statusCode: { type: 'number', nullable: false },
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
  @Put()
  public async update(@Req() { user }: AuthorizedRequest, @Body() updateUserDto: UpdateUserDto) {
    return await this.callbackHandler(
      this._usersService.update.bind(this._usersService, user.sub, updateUserDto),
    ).then<UserDto>(UserMapper.mapEntityToDto.bind(this));
  }

  @ApiOkResponse({
    description: 'Returns current user profile.',
    schema: {
      properties: {
        statusCode: { type: 'number', nullable: false, default: 200 },
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
  @Delete()
  public async delete(@Req() { user }: AuthorizedRequest) {
    return await this.callbackHandler(this._usersService.delete.bind(this._usersService, user.sub)).then<UserDto>(
      UserMapper.mapEntityToDto.bind(this),
    );
  }
}
