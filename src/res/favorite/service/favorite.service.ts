import { Injectable, NotFoundException } from '@nestjs/common';
import { FavoriteRequestDto } from '../dto/favorite-request.dto';
import {
  FavoriteResponseDto,
  ShowFavoriteByIdResponseDto,
  ShowFavoritesResponseDto,
} from '../dto/favorite-response.dto';
import { FavoriteRepository } from '../repository/favorite.repository';

@Injectable()
export class FavoriteService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async getUserFavorites(userId: number): Promise<ShowFavoritesResponseDto[]> {
    const favorites = await this.favoriteRepository.findAllByUser(userId);
    return favorites.map((favorite) => {
      const { movie, comment, collection } = favorite;
      return new ShowFavoritesResponseDto(
        favorite.user.id,
        favorite.addedAt,
        movie ? movie.id : null, // movie ID가 없을 경우 null 처리
        movie ? movie.title : '', // movie 제목이 없을 경우 빈 문자열 처리
        comment ? comment.id : null, // comment ID가 없을 경우 null 처리
        comment ? comment.content : '', // comment 내용이 없을 경우 빈 문자열 처리
        collection ? collection.id : null, // collection ID가 없을 경우 null 처리
        collection ? collection.name : '', // collection 제목이 없을 경우 빈 문자열 처리
      );
    });
  }

  async addFavorite(favoriteRequestDto: FavoriteRequestDto): Promise<FavoriteResponseDto> {
    const savedFavorite = await this.favoriteRepository.addFavorite(favoriteRequestDto);
    return new FavoriteResponseDto(
      savedFavorite.id,
      true,
      '관심 항목이 추가되었습니다.'
    );
  }

  async removeFavorite(id: number): Promise<FavoriteResponseDto> {
    const favorite = await this.favoriteRepository.findById(id);
    if (!favorite) {
      throw new NotFoundException(`Favorite with ID ${id} not found`);
    }

    await this.favoriteRepository.removeFavorite(id);
    return new FavoriteResponseDto(id, true, '관심 항목이 삭제되었습니다.');
  }

  async getFavoriteById(id: number): Promise<ShowFavoriteByIdResponseDto> {
    const favorite = await this.favoriteRepository.findById(id);
    if (!favorite) {
      throw new NotFoundException(`Favorite with ID ${id} not found`);
    }

    const { movie, comment, collection } = favorite;
    return new ShowFavoriteByIdResponseDto(
      favorite.user.id,
      favorite.addedAt,
      movie ? movie.id : null,
      movie ? movie.title : '',
      comment ? comment.id : null,
      comment ? comment.content : '',
      collection ? collection.id : null,
      collection ? collection.name : '',
    );
  }
}
