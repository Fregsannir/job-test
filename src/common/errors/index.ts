export type ErrorType = 'bad_request' | 'forbidden' | 'internal' | 'not_found' | 'unauthorized';

export const ErrorTypeCodes: Record<ErrorType, number> = {
  bad_request: 400,
  forbidden: 403,
  internal: 500,
  not_found: 404,
  unauthorized: 401,
} as const;

export abstract class BaseError extends Error {
  public readonly type!: ErrorType;

  constructor(message: string, type: ErrorType = 'internal') {
    super(message);
    this.type = type;
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, 'bad_request' as ErrorType);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(message, 'forbidden' as ErrorType);
  }
}

export class InternalError extends BaseError {
  constructor(message: string = 'Something went wrong, please try later.') {
    super(message, 'internal' as ErrorType);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 'not_found' as ErrorType);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string = "Unauthorized, please check that you've provided correct credentials.") {
    super(message, 'unauthorized' as ErrorType);
  }
}
