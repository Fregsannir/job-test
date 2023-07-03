import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsPositive, IsUUID } from 'class-validator';

export class PayloadDto {
  @ApiProperty()
  @IsUUID('4')
  @IsNotEmpty()
  public sub!: string;

  @ApiProperty()
  @IsPhoneNumber('RU')
  @IsOptional()
  public phone?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  public email?: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  public iat?: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  public exp?: number;
}
