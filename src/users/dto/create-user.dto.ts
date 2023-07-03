import { Case, Trim } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { UserCreationAttributes } from '@users/entities/user.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto implements UserCreationAttributes {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  @Trim()
  public readonly name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  @Trim()
  public readonly surname?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  @Trim()
  @Case()
  public readonly email?: string;

  @ApiProperty()
  @IsPhoneNumber('RU')
  @IsOptional()
  @Trim()
  public readonly phone?: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @IsNotEmpty()
  @Trim()
  public readonly password!: string;
}

export type CreateUserWithEmailDto = Omit<CreateUserDto, 'phone'>;
export type CreateUserWithPhoneDto = Omit<CreateUserDto, 'email'>;
