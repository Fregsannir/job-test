import { Transform, TransformFnParams, TransformOptions } from 'class-transformer';

export type CaseOptions = 'localeUpperCase' | 'localeLowerCase' | 'upperCase';

/**
 * Converts string case by provided case options.
 *
 * By default converts string to lowercase.
 */
export function Case(caseOptions?: CaseOptions, options?: TransformOptions): PropertyDecorator {
  return Transform(({ key, value }: TransformFnParams) => {
    if (typeof value !== 'string') {
      throw new Error(`'${key}' must be a type of string.`);
    }

    switch (caseOptions) {
      case 'localeUpperCase':
        return value.toLocaleUpperCase();
      case 'localeLowerCase':
        return value.toLocaleLowerCase();
      case 'upperCase':
        return value.toUpperCase();
      default:
        return value.toLowerCase();
    }
  }, options);
}
