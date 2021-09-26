import { Injectable } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create.dto';
import { Movie } from './entities/movies.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  find(): Movie[] {
    return this.movies;
  }

  findByID(id: string): Movie {
    return this.movies.find((m) => m.id === id);
  }

  create(body: CreateMovieDTO): Movie {
    this.movies.push(body);
    return this.movies.find((m) => m.id === body.id);
  }
}
