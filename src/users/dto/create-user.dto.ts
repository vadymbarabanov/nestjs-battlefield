import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    example: 'user@example.org',
    description: "User's description",
  })
  @IsString({ message: 'email must be a string type' })
  @IsEmail({}, { message: 'email invalid' })
  readonly email: string;

  @ApiProperty({ example: '1234password', description: "User's password" })
  @IsString({ message: 'password must be a string type' })
  @Length(4, 30, { message: 'password sould match required length' })
  readonly password: string;
}
