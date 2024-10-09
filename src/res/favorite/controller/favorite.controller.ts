import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { FavoriteService } from '../service/favorite.service';
import { FavoriteRequestDto } from '../dto/favorite-request.dto';
import { FavoriteResponseDto, ShowFavoritesResponseDto, ShowFavoriteByIdResponseDto } from '../dto/favorite-response.dto';

@Controller('api/favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('add')
  async addFavorite(@Body() favoriteRequestDto: FavoriteRequestDto): Promise<FavoriteResponseDto> {
    const savedFavorite = await this.favoriteService.addFavorite(favoriteRequestDto);
    return new FavoriteResponseDto(
      savedFavorite.id,
      true,
      '관심 영화가 추가됨',
    );
  }

  @Delete('remove/:id')
  async removeFavorite(@Param('id') id: number): Promise<FavoriteResponseDto> {
    await this.favoriteService.removeFavorite(id);
    return new FavoriteResponseDto(id, true, '관심 영화가 삭제됨');
  }

  @Get('show/:userId')
  async showFavorites(@Param('userId') userId: number): Promise<ShowFavoritesResponseDto[]> {
    const favorites = await this.favoriteService.getUserFavorites(userId);
    return favorites.map(favorite => new ShowFavoritesResponseDto(
      favorite.userId,
      favorite.movieId,
      favorite.movieTitle,
      favorite.addedAt,
    ));
  }

  @Get('show/detail/:id')
  async showFavoriteById(@Param('id') id: number): Promise<ShowFavoriteByIdResponseDto> {
    const favorite = await this.favoriteService.getFavoriteById(id);
    return new ShowFavoriteByIdResponseDto(
      favorite.userId,
      favorite.movieId,
      favorite.movieTitle,
      favorite.addedAt,
    );
  }
}
