import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EventsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEventDto: Prisma.EventCreateInput) {
    try {
      return await this.databaseService.event.create({ data: createEventDto });
    } catch (error) {
      throw new Error('An error occurred while creating the event.');
    }
  }

  async findAll() {
    try {
      return await this.databaseService.event.findMany({
        include: { authors: true },
      });
    } catch (error) {
      throw new Error('An error occurred while fetching all events.');
    }
  }

  async findOne(id: number) {
    const event = await this.databaseService.event.findUnique({
      where: { id: id },
      include: { authors: true },
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: number, updateEventDto: Prisma.EventUpdateInput) {
    try {
      return await this.databaseService.event.update({
        where: { id: id },
        data: updateEventDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Event with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.event.delete({ where: { id: id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Event with ID ${id} not found`);
      }
      throw error;
    }
  }

  async addAuthor(eventId: number, authorId: number) {
    try {
      return await this.databaseService.event.update({
        where: { id: eventId },
        data: {
          authors: {
            connect: { id: authorId },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }
      throw error;
    }
  }

  async removeAuthor(eventId: number, authorId: number) {
    try {
      return await this.databaseService.event.update({
        where: { id: eventId },
        data: {
          authors: {
            disconnect: { id: authorId },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }
      throw error;
    }
  }

  async incrementLikes(id: number) {
    try {
      return await this.databaseService.event.update({
        where: { id: id },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Event with ID ${id} not found`);
      }
      throw error;
    }
  }

  async incrementDislikes(id: number) {
    try {
      return await this.databaseService.event.update({
        where: { id: id },
        data: {
          dislikes: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Event with ID ${id} not found`);
      }
      throw error;
    }
  }
}
