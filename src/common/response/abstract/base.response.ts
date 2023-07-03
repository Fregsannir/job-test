import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseResponse {
  @ApiProperty({ default: 500 })
  public readonly statusCode: number;

  constructor(statusCode: number) {
    this.statusCode = statusCode;
  }
}
