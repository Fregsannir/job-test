import { BadRequestError } from '@common/errors';

export class EmailAndPhoneWasProvidedError extends BadRequestError {
  constructor() {
    super('Both email and phone was provided. Please provide one of them.');
  }
}
