import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entity/movie.entity';
import { MovieRequestDto } from '../dto/movie-request.dto';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly repository: Repository<Movie>,
  ) {}

  // 영화 생성 (Create)
  async createMovie(movieRequestDto: MovieRequestDto): Promise<Movie> {
    const movie = this.repository.create(movieRequestDto); 
    return await this.repository.save(movie);
  }

  // 영화 전체 조회 (Read)
  async findAllMovies(): Promise<Movie[]> {
    return await this.repository.find();
  }

  // 특정 영화 조회 (Read)
  async findMovieById(id: number): Promise<Movie> {
    return await this.repository.findOne({ where: { id } }); 
  }

  // 영화 업데이트 (Update)
  async updateMovie(id: number, movieRequestDto: MovieRequestDto): Promise<Movie> {
    await this.repository.update(id, movieRequestDto); 
    return await this.findMovieById(id);
  }

  // 영화 삭제 (Delete)
  async deleteMovie(id: number): Promise<void> {
    await this.repository.delete(id); 
  }
}
