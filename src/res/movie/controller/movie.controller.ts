import { Controller, Post, Get, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { MovieService } from '../service/movie.service';
import { MovieRequestDto } from '../dto/movie-request.dto';
import { MovieResponseDto } from '../dto/movie-response.dto';
import { Movie } from '../entity/movie.entity';
import { Genre } from 'src/res/genre/genre.enum';

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

  @Get(':id')
 async getMovieById(@Param('id') id: number): Promise<MovieResponseDto> {
  const movie = await this.movieService.getMovieById(id);
  return movie;
  }

  @Get('genre')
  async filterByGenre(@Query('genre') genre: Genre): Promise<MovieResponseDto[]> {
  return this.movieService.filterMoviesByGenre(genre);
  }

  @Get('paginated')
  async getMoviesPaginated(
  @Query('page') page: number = 1,
  @Query('limit') limit: number = 15, // 영화 수 -> 회의
  ): Promise<MovieResponseDto[]> {
  return this.movieService.getMoviesPaginated(page, limit);
  }


  @Put(':id')
  async updateMovie(@Param('id') id: number, @Body() movieRequestDto: MovieRequestDto): Promise<MovieResponseDto> {
    return this.movieService.updateMovie(id, movieRequestDto);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: number): Promise<void> {
    await this.movieService.deleteMovie(id);
  }

  @Get('search')
  async searchMovies(@Query('title') title: string): Promise<Movie[]> {
    return this.movieService.searchMovies(title);
  }
}
