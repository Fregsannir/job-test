import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from './abstract/base.response';

export class ErrorResponse extends BaseResponse {
  @ApiProperty({ default: '/' })
  public readonly path!: string;

  @ApiProperty({ default: Date.now() })
  public readonly timestamp!: number;

  @ApiProperty({ default: 'Something went wrong, please try later.' })
  public readonly error!: unknown;

  constructor(statusCode: number, path: string, timestamp: number, error: unknown) {
    super(statusCode);
    this.path = path;
    this.timestamp = timestamp;
    this.error = error;
  }
}
