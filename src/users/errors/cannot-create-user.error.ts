import { InternalError } from '@common/errors';

export class CannotCreateUserError extends InternalError {
  constructor() {
    super('Cannot create new user, please try later.');
  }
}
