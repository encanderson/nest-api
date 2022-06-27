import { ApiProperty } from '@nestjs/swagger';

export class Credentials {
  @ApiProperty()
  cpf: string;

  @ApiProperty()
  password: string;
}
