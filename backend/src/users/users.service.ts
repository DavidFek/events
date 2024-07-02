import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = {
      ...createUserDto,
      password: hashedPassword,
    };
    const createdUser = await this.databaseService.user.create({ data: user });
    const { password, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  }

  async findAll() {
    const users = await this.databaseService.user.findMany({});
    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async findOne(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: { id: id },
    });
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto = {
        ...updateUserDto,
        password: hashedPassword,
      };
    }
    const updatedUser = await this.databaseService.user.update({
      where: { id: id },
      data: updateUserDto,
    });
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async remove(id: number) {
    return this.databaseService.user.delete({ where: { id: id } });
  }
}
