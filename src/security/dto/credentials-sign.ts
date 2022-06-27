import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @ApiProperty()
  cpf: string;

  @ApiProperty()
  password: string;
}

export class ConfirmSignDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  code: string;
}
