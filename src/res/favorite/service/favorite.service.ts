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
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: FavoriteRepository, // FavoriteRepository 사용
  ) {}

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
