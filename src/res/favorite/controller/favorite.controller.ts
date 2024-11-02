import { Controller, Post, Delete, Get, Param, Body, NotFoundException, ConflictException } from '@nestjs/common';
import { FavoriteService } from '../service/favorite.service';
import { FavoriteRequestDto } from '../dto/favorite-request.dto';
import { FavoriteResponseDto, ShowFavoritesResponseDto, ShowFavoriteByIdResponseDto } from '../dto/favorite-response.dto';
import { CheckFavoriteResponseDto } from '../dto/checkfavorite-response.dto';

@Controller('api/favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('add')
  async addFavorite(@Body() favoriteRequestDto: FavoriteRequestDto): Promise<FavoriteResponseDto> {
    const isAlreadyFavorited = await this.favoriteService.isMovieFavoritedByUser(favoriteRequestDto.userId, favoriteRequestDto.movieId);
    
    if (isAlreadyFavorited) {
      throw new ConflictException('이미 좋아요를 누른 항목입니다.');
    }
    
    const savedFavorite = await this.favoriteService.addFavorite(favoriteRequestDto);
    return new FavoriteResponseDto(
      savedFavorite.id,
      true,
      '관심 항목이 추가되었습니다.'
    );
  }

  @Delete('remove/:userId/:movieId')
  async removeFavorite(
    @Param('userId') userId: number,
    @Param('movieId') movieId: number
  ): Promise<FavoriteResponseDto> {
    const result = await this.favoriteService.removeFavoriteByUserAndMovie(userId, movieId);
    if (!result) {
      throw new NotFoundException(`userId ${userId}와 movieId ${movieId}에 대한 좋아요 항목을 찾을 수 없습니다.`);
    }
    return new FavoriteResponseDto(result.id, true, '관심 항목이 삭제되었습니다.');
  }

  @Get('show/:userId')
  async showFavorites(@Param('userId') userId: number): Promise<ShowFavoritesResponseDto[]> {
    const favorites = await this.favoriteService.getUserFavorites(userId);
    return favorites.map(favorite => new ShowFavoritesResponseDto(
      favorite.userId,
      favorite.addedAt,
      favorite.movieId,
      favorite.movieTitle,
      favorite.commentId,
      favorite.commentText,
      favorite.collectionId,
      favorite.collectionTitle,
    ));
  }

  @Get('show/detail/:id')
  async showFavoriteById(@Param('id') id: number): Promise<ShowFavoriteByIdResponseDto> {
    const favorite = await this.favoriteService.getFavoriteById(id);
    return new ShowFavoriteByIdResponseDto(
      favorite.userId,
      favorite.addedAt,
      favorite.movieId,
      favorite.movieTitle,
      favorite.commentId,
      favorite.commentContent,
      favorite.collectionId,
      favorite.collectionName,
    );
  }
  @Get('check/:userId/:movieId')
  async checkIfFavorited(
    @Param('userId') userId: number,
    @Param('movieId') movieId: number
  ): Promise<CheckFavoriteResponseDto> {
    const isFavorited = await this.favoriteService.isMovieFavoritedByUser(userId, movieId);
    return new CheckFavoriteResponseDto(userId, movieId, isFavorited);
  }
}
