import { Transform, plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidationError,
  validateSync,
} from 'class-validator';

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

export function validate(
  configuration: Record<string, unknown>,
): AppConfiguration {
  const finalConfiguration: AppConfiguration = plainToInstance(
    AppConfiguration,
    configuration,
    { enableImplicitConversion: true },
  );

  const errors: ValidationError[] = validateSync(finalConfiguration, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return finalConfiguration;
}
