import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EventsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEventDto: Prisma.EventCreateInput) {
    return this.databaseService.event.create({ data: createEventDto });
  }

  async findAll() {
    return this.databaseService.event.findMany({
      include: { authors: true },
    });
  }

  async findOne(id: number) {
    return this.databaseService.event.findUnique({
      where: { id: id },
      include: { authors: true },
    });
  }

  async update(id: number, updateEventDto: Prisma.EventUpdateInput) {
    return this.databaseService.event.update({
      where: { id: id },
      data: updateEventDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.event.delete({ where: { id: id } });
  }

  async addAuthor(eventId: number, authorId: number) {
    return this.databaseService.event.update({
      where: { id: eventId },
      data: {
        authors: {
          connect: { id: authorId },
        },
      },
    });
  }

  async removeAuthor(eventId: number, authorId: number) {
    return this.databaseService.event.update({
      where: { id: eventId },
      data: {
        authors: {
          disconnect: { id: authorId },
        },
      },
    });
  }

  async incrementLikes(id: number) {
    return this.databaseService.event.update({
      where: { id: id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
  }

  async incrementDislikes(id: number) {
    return this.databaseService.event.update({
      where: { id: id },
      data: {
        dislikes: {
          increment: 1,
        },
      },
    });
  }
}
