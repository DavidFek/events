import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Prisma } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from 'src/dto/generate/create-event.dto';
import { UpdateEventDto } from 'src/dto/generate/update-event.dto';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create an event' })
  @ApiResponse({ status: 201, description: 'OK. Event created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('USER', 'ADMIN')
  @ApiOperation({ summary: 'Find all the events' })
  @ApiResponse({ status: 200, description: 'OK. Returns a list of events.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('USER', 'ADMIN')
  @ApiOperation({ summary: 'Find an event based on ID number' })
  @ApiResponse({ status: 200, description: 'OK. Returns an event.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update an event' })
  @ApiResponse({ status: 200, description: 'OK. Event updated successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Remove an event' })
  @ApiResponse({ status: 200, description: 'Event removed successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }

  @Put(':eventId/author/:authorId')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Add an author to an event' })
  @ApiResponse({ status: 200, description: 'Author added successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Event or Author not found.' })
  async addAuthor(
    @Param('eventId') eventId: string,
    @Param('authorId') authorId: string,
  ) {
    return this.eventsService.addAuthor(+eventId, +authorId);
  }

  @Delete(':eventId/author/:authorId')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Remove an author to an event' })
  @ApiResponse({ status: 200, description: 'Author removed successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Event or Author not found.' })
  async removeAuthor(
    @Param('eventId') eventId: string,
    @Param('authorId') authorId: string,
  ) {
    return this.eventsService.removeAuthor(+eventId, +authorId);
  }

  @Patch(':id/like')
  @UseGuards(RolesGuard)
  @Roles('USER', 'ADMIN')
  @ApiOperation({ summary: 'Increment likes for an event' })
  @ApiResponse({ status: 200, description: 'Likes incremented successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async incrementLikes(@Param('id') id: string) {
    return this.eventsService.incrementLikes(+id);
  }

  @Patch(':id/dislike')
  @UseGuards(RolesGuard)
  @Roles('USER', 'ADMIN')
  @ApiOperation({ summary: 'Increment dislikes for an event' })
  @ApiResponse({
    status: 200,
    description: 'Dislikes incremented successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async incrementDislikes(@Param('id') id: string) {
    return this.eventsService.incrementDislikes(+id);
  }
}
