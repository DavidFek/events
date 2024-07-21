import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = {
        ...createUserDto,
        password: hashedPassword,
      };
      const createdUser = await this.databaseService.user.create({
        data: user,
      });
      const { password, ...userWithoutPassword } = createdUser;
      return userWithoutPassword;
    } catch (error) {
      throw new Error('An error occurred while creating the user.');
    }
  }

  async findAll() {
    try {
      const users = await this.databaseService.user.findMany({});
      return users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    } catch (error) {
      throw new Error('An error occurred while fetching all users.');
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { id: id },
      });

      if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
      return null;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    try {
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
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.user.delete({ where: { id: id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }
}
