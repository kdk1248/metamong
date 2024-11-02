export class CheckFavoriteResponseDto {
    userId: number;
    movieId: number;
    isFavorited: boolean;
  
    constructor(userId: number, movieId: number, isFavorited: boolean) {
      this.userId = userId;
      this.movieId = movieId;
      this.isFavorited = isFavorited;
    }
  }
  