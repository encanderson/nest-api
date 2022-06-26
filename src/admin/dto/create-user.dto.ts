import { CreateUserDto } from '../../users/dto/create-user.dto';

export class AdminUserDto extends CreateUserDto {
  cpf?: string;
}
