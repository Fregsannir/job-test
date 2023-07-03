import { Transform, plainToInstance } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidationError, validateSync } from 'class-validator';
import { Algorithm } from 'jsonwebtoken';

export enum Environment {
  Development = 'development',
  Production = 'production',
}

export class AppConfiguration {
  @IsEnum(Environment)
  @IsNotEmpty()
  public readonly NODE_ENV!: Environment;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  public readonly APP_PORT!: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  public readonly APP_SALT_ROUNDS!: number;

  @IsString()
  @IsNotEmpty()
  public readonly APP_JWT_ALGORITHM!: Algorithm;

  @IsString()
  @IsNotEmpty()
  public readonly APP_JWT_EXPIRES_IN!: string;

  @IsString()
  @IsOptional()
  public readonly APP_JWT_SECRET?: string;

  @IsString()
  @IsOptional()
  public readonly APP_JWT_PUBLIC_KEY?: string;

  @IsString()
  @IsOptional()
  public readonly APP_JWT_PRIVATE_KEY?: string;

  @IsString()
  @IsNotEmpty()
  public readonly APP_DB_HOST!: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  public readonly APP_DB_PORT!: number;

  @IsString()
  @IsNotEmpty()
  public readonly APP_DB_USERNAME!: string;

  @IsString()
  @IsNotEmpty()
  public readonly APP_DB_PASSWORD!: string;

  @IsString()
  @IsNotEmpty()
  public readonly APP_DB_NAME!: string;
}

export function validate(configuration: Record<string, unknown>): AppConfiguration {
  const finalConfiguration: AppConfiguration = plainToInstance(AppConfiguration, configuration, {
    enableImplicitConversion: true,
  });

  const errors: ValidationError[] = validateSync(finalConfiguration, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return finalConfiguration;
}
