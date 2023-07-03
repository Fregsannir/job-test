import { UserDto } from '@users/dto/user.dto';
import { User } from '@users/entities/user.entity';

export class UserMapper {
  public static mapEntityToDto(user: User): UserDto {
    return UserDto.create(user);
  }
}
