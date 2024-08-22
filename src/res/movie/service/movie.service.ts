import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieRequestDto } from '../dto/movie-request.dto';
import { MovieResponseDto } from '../dto/movie-response.dto';
import { Movie } from '../entity/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async createMovie(
    movieRequestDto: MovieRequestDto,
  ): Promise<MovieResponseDto> {
    const movie = this.movieRepository.create(movieRequestDto);
    const savedMovie = await this.movieRepository.save(movie);
    return new MovieResponseDto(savedMovie);
  }

  async getMovies(): Promise<MovieResponseDto[]> {
    const movies = await this.movieRepository.find({
      order: {
        modifiedAt: 'DESC',
      },
    });
    return movies.map((movie) => new MovieResponseDto(movie));
  }

  async updateMovie(
    id: number,
    movieRequestDto: MovieRequestDto,
  ): Promise<MovieResponseDto> {
    const movie = await this.movieRepository.findOneBy({ id });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    this.movieRepository.merge(movie, movieRequestDto);
    const updatedMovie = await this.movieRepository.save(movie);
    return new MovieResponseDto(updatedMovie);
  }

  async deleteMovie(id: number): Promise<void> {
    const result = await this.movieRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
  }
}
