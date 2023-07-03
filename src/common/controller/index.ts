import { ErrorTypeCodes } from '@common/errors';
import { isLeft } from '@common/libs/either';
import { ServiceReturn } from '@common/types';
import { HttpException } from '@nestjs/common';

export abstract class BaseController {
  protected async callbackHandler<T extends unknown>(
    callback: (...args: unknown[]) => PromiseLike<ServiceReturn<T>>,
  ): Promise<T> {
    return await callback().then((x: ServiceReturn<T>) => {
      if (isLeft(x)) {
        throw new HttpException(x.left.message, ErrorTypeCodes[x.left.type]);
      }
      return x.right;
    });
  }
}
