import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  id: string;

  user_id: string;

  @ApiProperty()
  name: string;

  active: boolean;

  @ApiProperty()
  app: string;

  code?: number;

  created_at: Date;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  picture?: string;

  updated_at: Date;
}
