import { NotFoundError } from '@common/errors';

export class PasswordDoNotMatch extends NotFoundError {
  constructor() {
    super('Password do not match, please check that you have provided a correct password.');
  }
}
