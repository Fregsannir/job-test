import { ServiceReturn } from '@common/types';
import { HashString } from '@cryptor/types';

export const PasswordCryptorUseCaseSymbol: symbol = Symbol('PasswordCryptorUseCase');

export interface PasswordCryptorUseCase {
  hash(plainPassword: string): Promise<ServiceReturn<HashString>>;
  hashSync(plainPassword: string): ServiceReturn<HashString>;
  compare(plainPassword: string, passwordHash: HashString): Promise<ServiceReturn<boolean>>;
  compareSync(plainPassword: string, passwordHash: HashString): ServiceReturn<boolean>;
}
