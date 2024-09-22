import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.repository.find({
      order: { modifiedAt: 'DESC' },
    });
  }

  // 특정 영화 조회 (Read)
  async findMovieById(id: number): Promise<Movie> {
    return await this.repository.findOne({ where: { id } });
  }

    // 영화 필터링
    async filterMovies(
      genre?: string,
      directorId?: number,
      actor?: string,
    ): Promise<Movie[]> {
      const queryBuilder = this.repository.createQueryBuilder('movie');
  
      if (genre) {
        queryBuilder.andWhere('movie.genre = :genre', { genre });
      }
  
      if (directorId) {
        queryBuilder.andWhere('movie.directorId = :directorId', { directorId });
      }
  
      if (actor) {
        queryBuilder.andWhere('movie.actor LIKE :actor', { actor: `%${actor}%` });
      }
  
      return await queryBuilder
        .orderBy('movie.modifiedAt', 'DESC')
        .getMany();
    }

  // 페이징 처리된 영화 조회
  async findMoviesPaginated(page: number, limit: number): Promise<[Movie[], number]> {
    return await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { modifiedAt: 'DESC' },
    });
  }

  // 영화 업데이트 (Update)
  async updateMovie(id: number, movieRequestDto: MovieRequestDto): Promise<Movie> {
    await this.repository.update(id, movieRequestDto);
    return await this.findMovieById(id);
  }

  // 영화 삭제 (Delete)
  async deleteMovie(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
  }

  // 영화 검색
  async searchMovies(title: string): Promise<Movie[]> {
    return await this.repository
      .createQueryBuilder('movie')
      .where('movie.title LIKE :title', { title: `%${title}%` })
      .orderBy('movie.modifiedAt', 'DESC') // 내림차순 정렬 추가
      .getMany();
  }
}
