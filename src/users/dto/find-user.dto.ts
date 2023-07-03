import { Trim } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { UserAttributes } from '@users/entities/user.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class FindUserByIdDto {
  @ApiProperty()
  @IsUUID('4')
  @IsNotEmpty()
  @Trim()
  public readonly id!: string;
}

export class FindUserByAttributesDto
  implements Partial<Omit<UserAttributes, 'id' | 'password' | 'createdAt' | 'updatedAt'>>
{
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  @Trim()
  public readonly name?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  @Trim()
  public readonly surname?: string;

  @ApiProperty({
    required: false,
  })
  @IsEmail()
  @IsOptional()
  @Trim()
  public readonly email?: string;

  @ApiProperty({
    required: false,
  })
  @IsPhoneNumber('RU')
  @IsOptional()
  @Trim()
  public readonly phone?: string;
}

export type FindUserDto = FindUserByIdDto | FindUserByAttributesDto;
