import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../entity/favorite.entity';
import { Movie } from 'src/res/movie/entity/movie.entity';
import { FavoriteRequestDto } from '../dto/favorite-request.dto';
import { User } from 'src/res/user/entity/user.entity';

@Injectable()
export class FavoriteRepository {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) { } 
  async addFavorite(favoriteRequestDto: FavoriteRequestDto): Promise<Favorite> {
    // userId와 movieId를 기반으로 UserEntity와 MovieEntity를 데이터베이스에서 조회합니다.
    const user = await this.userRepository.findOne({ where: { id: favoriteRequestDto.userId } });
    const movie = await this.movieRepository.findOne({where: { id: favoriteRequestDto.movieId },
    });

    if (!user || !movie) {
      throw new Error('Invalid user or movie ID');
    }

    const favorite = this.favoriteRepository.create({
      user: user,
      movie: movie,
      addedAt: new Date(),
    });

    try {
      return await this.favoriteRepository.save(favorite);
    } catch (error) {
      throw new Error('실패: ' + error.message);
    }
  }

  // 관심 영화를 삭제하는 메서드
  async removeFavorite(id: number): Promise<void> {
    await this.favoriteRepository.delete(id);
  }

  // 사용자 ID와 영화 ID로 특정 관심 영화를 찾는 메서드
  async findByUserAndMovie(userId: number, movieId: number): Promise<Favorite | null> {
    return await this.favoriteRepository.findOne({
      where: {
        // user: { id: userId },
        movie: { id: movieId },
      },
    });

  }

  // 특정 사용자의 모든 관심 영화를 찾는 메서드
  async findAllByUser(userId: number): Promise<Favorite[]> {
    return await this.favoriteRepository.find({
      where: { user: { id: userId } },
      relations: ['movie'],
    });
  }

  // ID로 특정 관심 영화를 찾는 메서드
  async findById(id: number): Promise<Favorite | null> {
    return await this.favoriteRepository.findOne({
      where: { id },
      relations: ['movie'],
    });
  }
}
