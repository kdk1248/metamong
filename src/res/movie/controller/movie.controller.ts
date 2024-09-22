import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MovieRequestDto } from '../dto/movie-request.dto';
import { MovieResponseDto } from '../dto/movie-response.dto';
import { Movie } from '../entity/movie.entity';
import { MovieService } from '../service/movie.service';

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

  @Get('filter')
async filterMovies(
  @Query('genre') genre?: string,
  @Query('directorId') directorId?: number,
  @Query('actor') actor?: string,
): Promise<MovieResponseDto[]> {
  return this.movieService.filterMovies({ genre, directorId, actor });
}

  @Get('paginated')
  async getMoviesPaginated(
  @Query('page') page: number = 1,
  @Query('limit') limit: number = 15,
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
