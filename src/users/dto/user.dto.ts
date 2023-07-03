import { EntityID } from '@common/types';
import { UserAttributes } from '@users/entities/user.entity';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID('4')
  @IsNotEmpty()
  public id!: EntityID;

  @IsString()
  @IsOptional()
  public name?: string;

  @IsString()
  @IsOptional()
  public surname?: string;

  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsPhoneNumber('RU')
  @IsOptional()
  public phone?: string;

  @IsDate()
  @IsOptional()
  public createdAt?: Date;

  @IsDate()
  @IsOptional()
  public updatedAt?: Date;

  private constructor(attributes: UserAttributes) {
    this.id = attributes.id;
    this.name = attributes?.name;
    this.surname = attributes?.surname;
    this.email = attributes?.email;
    this.phone = attributes?.phone;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
  }

  public static create(attributes: UserAttributes): UserDto {
    return new UserDto(attributes);
  }
}
