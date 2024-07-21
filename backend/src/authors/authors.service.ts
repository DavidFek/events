import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthorsService {
  constructor(private readonly databaseSerive: DatabaseService) {}

  async create(createAuthorDto: Prisma.AuthorCreateInput) {
    try {
      return await this.databaseSerive.author.create({ data: createAuthorDto });
    } catch (error) {
      throw new Error('An error occurred while creating the author.');
    }
  }

  async findAll() {
    try {
      return await this.databaseSerive.author.findMany({
        include: { events: true },
      });
    } catch (error) {
      throw new Error('An error occurred while fetching all authors.');
    }
  }

  async findOne(id: number) {
    try {
      return await this.databaseSerive.author.findUnique({
        where: { id: id },
        include: { events: true },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Author with ID ${id} not found`);
      }
      throw error;
    }
  }

  async update(id: number, updateAuthorDto: Prisma.AuthorUpdateInput) {
    try {
      return await this.databaseSerive.author.update({
        where: { id: id },
        data: updateAuthorDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Author with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseSerive.author.delete({ where: { id: id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Author with ID ${id} not found`);
      }
      throw error;
    }
  }

  async addEvent(authorId: number, eventId: number) {
    try {
      return await this.databaseSerive.author.update({
        where: { id: authorId },
        data: {
          events: {
            connect: { id: eventId },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Author with ID ${authorId} not found`);
      }
      throw error;
    }
  }

  async removeEvent(authorId: number, eventId: number) {
    try {
      return await this.databaseSerive.author.update({
        where: { id: authorId },
        data: {
          events: {
            disconnect: { id: eventId },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Author with ID ${authorId} not found`);
      }
      throw error;
    }
  }
}
