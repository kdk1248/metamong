export class FavoriteRequestDto {
  userId: number;  // 관심 영화 추가를 signupRequestDto하는 사용자의 ID
  movieId: number; // 관심 영화로 추가할 영화의 ID
  static userId: number;
  static movieId: number;
}
