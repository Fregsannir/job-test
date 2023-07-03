import { BaseError } from '@common/errors';
import { Either } from '@common/libs/either';

export type EntityID = string;
export type ServiceReturn<T extends unknown> = Either<BaseError, T>;
