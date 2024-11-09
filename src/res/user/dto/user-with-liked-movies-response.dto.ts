// src/res/user/dto/user-with-liked-movies-response.dto.ts

import { ShowFavoritesResponseDto } from "src/res/favorite/dto/favorite-response.dto";
import { User } from "../entity/user.entity";

export class UserWithLikedMoviesResponseDto {
  id: number;
  username: string;
  email: string;
  favorites: ShowFavoritesResponseDto[];  // 좋아요한 영화 목록

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;

    // 좋아요한 영화 목록을 ShowFavoritesResponseDto로 변환하여 favorites에 저장
    this.favorites = user.favorite.map(favorite => new ShowFavoritesResponseDto(
      user.id,  // favorite.user.id 대신 user.id 사용
      favorite.addedAt,
      favorite.movie?.id ?? null,  // null 처리를 명확하게
      favorite.movie?.title ?? null,
      favorite.comment?.id ?? null,
      favorite.comment?.commentContent ?? null,
      favorite.collection?.id ?? null,
      favorite.collection?.name ?? null
    ));
  }
}
