import { Trim } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { UserAttributes } from '@users/entities/user.entity';
import { IsEmail, IsOptional, IsPhoneNumber, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto implements Partial<Omit<UserAttributes, 'id' | 'password' | 'createdAt' | 'updatedAt'>> {
  @ApiProperty()
  @IsUUID('4')
  @IsOptional()
  @Trim()
  public readonly id?: string;

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
  public readonly email?: string;

  @ApiProperty()
  @IsPhoneNumber('RU')
  @IsOptional()
  @Trim()
  public readonly phone?: string;
}
