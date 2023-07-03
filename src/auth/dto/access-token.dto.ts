import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AccessTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly accessToken!: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
