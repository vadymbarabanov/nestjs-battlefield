import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDTO {
  @ApiProperty({
    example: 'ADMIN',
    description: "The value of user's role",
  })
  readonly value: string;

  @ApiProperty({
    example: 'Administrator',
    description: "The description of user's role",
  })
  readonly description: string;
}
