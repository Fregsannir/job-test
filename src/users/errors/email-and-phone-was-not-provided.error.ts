import { BadRequestError } from '@common/errors';

export class EmailAndPhoneWasNotProvidedError extends BadRequestError {
  constructor() {
    super('Phone and email was not provided, you should provide at least one of parameters.');
  }
}
