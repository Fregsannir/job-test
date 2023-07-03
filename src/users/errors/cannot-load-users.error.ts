import { InternalError } from '@common/errors';

export class CannotLoadUsersError extends InternalError {
  constructor() {
    super('Cannot load users, please try later.');
  }
}
