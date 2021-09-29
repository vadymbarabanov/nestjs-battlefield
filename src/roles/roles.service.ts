import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDTO } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDTO) {
    return this.roleRepository.create(dto);
  }

  async getRoleByValue(value: string) {
    return this.roleRepository.findOne({ where: { value } });
  }
}
