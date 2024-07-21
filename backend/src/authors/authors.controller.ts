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
import { AuthorsService } from './authors.service';
import { Prisma } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorDto } from 'src/dto/generate/author.dto';
import { CreateAuthorDto } from 'src/dto/generate/create-author.dto';
import { UpdateAuthorDto } from 'src/dto/generate/update-author.dto';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create an author' })
  @ApiResponse({ status: 201, description: 'OK. Author created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('USER', 'ADMIN')
  @ApiOperation({ summary: 'Find all the authors' })
  @ApiResponse({ status: 200, description: 'OK. Returns a list of authors.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('USER', 'ADMIN')
  @ApiOperation({ summary: 'Find an author based on ID number' })
  @ApiResponse({ status: 200, description: 'OK. Returns an author.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update an author' })
  @ApiResponse({ status: 200, description: 'OK. Author updated successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Remove an author' })
  @ApiResponse({ status: 200, description: 'Author removed successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }

  @Put(':authorId/event/:eventId')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Add an event to an author' })
  @ApiResponse({ status: 200, description: 'Event added successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Event or Author not found.' })
  async addEvent(
    @Param('authorId') authorId: string,
    @Param('eventId') eventId: string,
  ) {
    return this.authorsService.addEvent(+authorId, +eventId);
  }

  @Delete(':authorId/event/:eventId')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Remove an event to an author' })
  @ApiResponse({ status: 200, description: 'Event removed successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Event or Author not found.' })
  async removeEvent(
    @Param('authorId') authorId: string,
    @Param('eventId') eventId: string,
  ) {
    return this.authorsService.removeEvent(+authorId, +eventId);
  }
}
