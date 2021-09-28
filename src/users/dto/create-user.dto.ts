import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    example: 'user@example.org',
    description: "User's description",
  })
  readonly email: string;

  @ApiProperty({ example: '1234password', description: "User's password" })
  readonly password: string;
}
