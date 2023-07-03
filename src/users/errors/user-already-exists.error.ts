import { BadRequestError } from '@common/errors';

export class UserAlreadyExistsError extends BadRequestError {
  constructor() {
    super("User with current 'email' or 'phone' already exists.");
  }
}
