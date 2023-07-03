import { BadRequestError } from '@common/errors';

export class EmailOrPhoneWasNotProvidedError extends BadRequestError {
  constructor() {
    super('Credentials was not provided. Please check you input and provide email or phone.');
  }
}
