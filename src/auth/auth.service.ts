import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDTO: CreateUserDTO) {}

  async register(userDTO: CreateUserDTO) {
    const candidate = await this.usersService.getByEmail(userDTO.email);
    if (candidate) {
      throw new HttpException(
        'User with this email already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcryptjs.hash(userDTO.password, 5);
    const user = await this.usersService.createUser({
      ...userDTO,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const payload = { id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
