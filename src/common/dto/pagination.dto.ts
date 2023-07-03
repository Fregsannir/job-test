import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationQueryDto {
  @ApiProperty({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  public readonly order?: Order = Order.ASC;

  @ApiProperty({ minimum: 1, default: 1, required: false })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @Min(1)
  public readonly page?: number = 1;

  @ApiProperty({ minimum: 10, maximum: 50, default: 10, required: false })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(10)
  @Max(50)
  @IsOptional()
  public readonly limit?: number = 10;

  public get skip(): number {
    return (this.page - 1) * this.limit;
  }
}

export class PaginationResultDto<T> {
  @ApiProperty()
  @IsNumber()
  public readonly page: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  public readonly previous: number | null;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  public readonly next: number | null;

  @ApiProperty()
  @IsNumber()
  public readonly limit: number;

  @ApiProperty()
  @IsNumber()
  public readonly pageCount: number;

  @ApiProperty()
  @IsNumber()
  public readonly itemCount: number;

  @ApiProperty()
  @IsArray()
  public readonly items!: T[];

  constructor(paginationQueryDto: PaginationQueryDto, itemCount: number, items: T[]) {
    this.page = paginationQueryDto.page;
    this.itemCount = itemCount;
    this.limit = paginationQueryDto.limit;
    this.pageCount = Math.ceil(this.itemCount / this.limit);
    this.previous = this.page <= 1 ? null : this.page - 1;
    this.next = this.page >= this.pageCount ? null : this.page + 1;
    this.items = items;
  }
}
