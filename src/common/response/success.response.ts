import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from './abstract/base.response';

export class SuccessResponse<T> extends BaseResponse {
  @ApiProperty()
  public readonly data?: T;

  constructor(statusCode: number, data?: T) {
    super(statusCode);
    this.data = data;
  }
}
