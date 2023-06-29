import {
  Transform,
  TransformFnParams,
  TransformOptions,
} from 'class-transformer';

export type TrimOptions = 'start' | 'end';

/**
 * Removes whitespaces from a string by provided trim options.
 *
 * By default removes whitespaces from both ends of a string.
 */
export function Trim(
  trimOptions?: TrimOptions,
  options?: TransformOptions,
): PropertyDecorator {
  return Transform(({ key, value }: TransformFnParams) => {
    if (typeof value !== 'string') {
      throw new Error(`'${key}' must be a type of string.`);
    }

    switch (trimOptions) {
      case 'start':
        return value.trimStart();
      case 'end':
        return value.trimEnd();
      default:
        return value.trim();
    }
  }, options);
}
