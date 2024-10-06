import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteRequestDto } from '../dto/favorite-request.dto';
import {
  FavoriteResponseDto,
  ShowFavoriteByIdResponseDto,
  ShowFavoritesResponseDto,
} from '../dto/favorite-response.dto';
import { Favorite } from '../entity/favorite.entity';
import { FavoriteRepository } from '../repository/favorite.repository';

@Injectable()
export class FavoriteService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  // 관심 목록에 있는 영화들을 가져오는 메서드
  async getUserFavoriteMovies(userId: string): Promise<any[]> {
    // 사용자 ID로 관심 영화 목록을 가져옴
    const favorites = await this.favoriteRepository.findAllByUser(parseInt(userId, 10));
    
    // 관심 영화 목록이 없는 경우 예외 처리
    if (!favorites || favorites.length === 0) {
      throw new NotFoundException(`No favorite movies found for user with ID ${userId}`);
    }

    // 사용자의 관심 영화 목록 반환 (영화의 제목과 장르를 포함)
    return favorites.map(favorite => ({
      title: favorite.movie.title,
      genre: favorite.movie.genre, // genre 필드는 영화의 장르를 저장하는 곳이라고 가정
    }));
  }

  async addFavorite(
    favoriteRequestDto: FavoriteRequestDto,
  ): Promise<FavoriteResponseDto> {
    // FavoriteRepository의 addFavorite 메서드를 사용
    const savedFavorite =
      await this.favoriteRepository.addFavorite(favoriteRequestDto);
    return new FavoriteResponseDto(
      savedFavorite.id,
      true,
      '관심 영화가 추가됨',
    );
  }

  async removeFavorite(id: number): Promise<FavoriteResponseDto> {
    const favorite = await this.favoriteRepository.findById(id);
    if (!favorite) {
      throw new NotFoundException(`Favorite with ID ${id} not found`);
    }

    await this.favoriteRepository.removeFavorite(id);
    return new FavoriteResponseDto(id, true, '관심 영화가 삭제됨');
  }

  async getUserFavorites(userId: number): Promise<ShowFavoritesResponseDto[]> {
    const favorites = await this.favoriteRepository.findAllByUser(userId);
    return favorites.map(
      (favorite) =>
        new ShowFavoritesResponseDto(
          favorite.user.id,
          favorite.movie.id,
          favorite.movie.title,
          favorite.addedAt,
        ),
    );
  }

  async getFavoriteById(id: number): Promise<ShowFavoriteByIdResponseDto> {
    const favorite = await this.favoriteRepository.findById(id);

    if (!favorite) {
      throw new NotFoundException(`Favorite with ID ${id} not found`);
    }

    return new ShowFavoriteByIdResponseDto(
      favorite.user.id,
      favorite.movie.id,
      favorite.movie.title,
      favorite.addedAt,
    );
  }
}
