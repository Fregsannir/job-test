import { ServiceReturn } from '@common/types';
import { User } from '@users/entities/user.entity';
import { AccessTokenDto } from '../dto/access-token.dto';
import { SignInDto } from '../dto/sign-in.dto';

export const AuthServiceUseCaseSymbol: symbol = Symbol('AuthUseCase');

export interface AuthServiceUseCase {
  validateUser(credentials: SignInDto): Promise<ServiceReturn<Omit<User, 'password'>>>;
  login(user: Omit<User, 'password'>): Promise<ServiceReturn<AccessTokenDto>>;
}
