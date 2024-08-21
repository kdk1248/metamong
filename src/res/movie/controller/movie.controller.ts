import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { MovieService } from '../service/movie.service';
import { MovieRequestDto } from '../dto/movie-request.dto';
import { MovieResponseDto } from '../dto/movie-response.dto';

@Controller('api/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  createMovie(@Body() movieRequestDto: MovieRequestDto): Promise<MovieResponseDto> {
    return this.movieService.createMovie(movieRequestDto);
  }

  @Get()
  getMovies(): Promise<MovieResponseDto[]> {
    return this.movieService.getMovies();
  }

  @Put(':id')
  async updateMovie(@Param('id') id: number, @Body() movieRequestDto: MovieRequestDto): Promise<MovieResponseDto> {
    return this.movieService.updateMovie(id, movieRequestDto);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: number): Promise<void> {
    await this.movieService.deleteMovie(id);
  }
}