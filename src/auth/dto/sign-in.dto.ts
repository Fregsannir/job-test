import { Case, Trim } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  @Trim()
  @Case()
  public email?: string;

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
  public password!: string;
}

export type SignInWithEmailDto = Omit<SignInDto, 'phone'>;
export type SignInWithPhoneDto = Omit<SignInDto, 'email'>;
