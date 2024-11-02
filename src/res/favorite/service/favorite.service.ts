import { Injectable, NotFoundException } from '@nestjs/common';
import { FavoriteRequestDto } from '../dto/favorite-request.dto';
import {
  FavoriteResponseDto,
  ShowFavoriteByIdResponseDto,
  ShowFavoritesResponseDto,
} from '../dto/favorite-response.dto';
import { FavoriteRepository } from '../repository/favorite.repository';
import { Favorite } from '../entity/favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async getUserFavorites(userId: number): Promise<ShowFavoritesResponseDto[]> {
    console.log(`Fetching favorites for user ID: ${userId}`);
    const favorites = await this.favoriteRepository.findAllByUser(userId);
    console.log(`Favorites fetched: ${JSON.stringify(favorites)}`);
    if (favorites.length === 0) {
      console.log(`No favorites found for user ID: ${userId}`);
    }
    return favorites.map((favorite) => {
      console.log(`Mapping favorite: ${JSON.stringify(favorite)}`);
      return new ShowFavoritesResponseDto(
        favorite.user.id,
        favorite.addedAt,
        favorite.movie ? favorite.movie.id : null,
        favorite.movie ? favorite.movie.title : '제목 없음',
        favorite.comment ? favorite.comment.id : null,
        favorite.comment ? favorite.comment.content : '',
        favorite.collection ? favorite.collection.id : null,
        favorite.collection ? favorite.collection.name : ''
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

  async removeFavoriteByUserAndMovie(userId: number, movieId: number): Promise<Favorite | null> {
    const favorite = await this.favoriteRepository.findByUserAndTarget(userId, movieId);
    if (!favorite) {
      return null;
    }
  
    await this.favoriteRepository.removeFavorite(favorite.id);
    return favorite;
  }
  
  async isMovieFavoritedByUser(userId: number, movieId: number): Promise<boolean> {
    const favorite = await this.favoriteRepository.findByUserAndTarget(userId, movieId);
    return !!favorite;  // favorite이 존재하면 true, 없으면 false를 반환
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
