import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDTO: CreateUserDTO) {
    const user = await this.validateUser(userDTO);
    return this.generateToken(user);
  }
  async register(userDTO: CreateUserDTO) {
    const candidate = await this.usersService.getByEmail(userDTO.email);
    if (candidate) {
      throw new HttpException(
        'user with this email already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDTO.password, 5);
    const user = await this.usersService.createUser({
      ...userDTO,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDTO: CreateUserDTO) {
    const user = await this.usersService.getByEmail(userDTO.email);
    const passwordEquals = await bcrypt.compare(
      userDTO.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'incorrect email or password' });
  }
}
