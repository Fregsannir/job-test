import { NotFoundError } from '@common/errors';
import { EntityID } from '@common/types';

export class UserNotFoundError extends NotFoundError {
  constructor(attributes: EntityID | unknown) {
    super(
      `User with current ${typeof attributes === 'string' ? 'id' : 'attributes'} not found: ${attributes.toString()}.`,
    );
  }
}
