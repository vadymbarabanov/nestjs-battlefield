import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDTO } from './dto/create.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(@Inject(MoviesService) private service: MoviesService) {}

  @Get()
  find(@Query('limit') limit: string, @Query('page') page: string) {
    return this.service.find();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findByID(id);
  }

  @Post()
  create(@Body() body: CreateMovieDTO) {
    return this.service.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return {
      id,
      body,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `delete ${id}`;
  }
}
