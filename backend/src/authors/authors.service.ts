import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthorsService {
  constructor(private readonly databaseSerive: DatabaseService) {}

  async create(createAuthorDto: Prisma.AuthorCreateInput) {
    return this.databaseSerive.author.create({ data: createAuthorDto });
  }

  async findAll() {
    return this.databaseSerive.author.findMany({ include: { events: true } });
  }

  async findOne(id: number) {
    return this.databaseSerive.author.findUnique({
      where: { id: id },
      include: { events: true },
    });
  }

  async update(id: number, updateAuthorDto: Prisma.AuthorUpdateInput) {
    return this.databaseSerive.author.update({
      where: { id: id },
      data: updateAuthorDto,
    });
  }

  async remove(id: number) {
    return this.databaseSerive.author.delete({ where: { id: id } });
  }

  async addEvent(authorId: number, eventId: number) {
    return this.databaseSerive.author.update({
      where: { id: authorId },
      data: {
        events: {
          connect: { id: eventId },
        },
      },
    });
  }

  async removeEvent(authorId: number, eventId: number) {
    return this.databaseSerive.author.update({
      where: { id: authorId },
      data: {
        events: {
          disconnect: { id: eventId },
        },
      },
    });
  }
}
