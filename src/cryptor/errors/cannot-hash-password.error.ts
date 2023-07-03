import { InternalError } from '@common/errors';

export class CannotHashPassword extends InternalError {
  constructor() {
    super('Cannot hash password, please try later.');
  }
}
