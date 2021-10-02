import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { USER } from 'src/constants/roles';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDTO) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue(USER);
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    return this.userRepository.findAll({ include: { all: true } });
  }

  async getByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }
}
