export class FavoriteResponseDto {
    id: number;        // 작업과 관련된 관심 항목의 ID
    success: boolean;  // 작업 성공 여부
    message: string;   // 클라이언트에게 전달할 메시지
  
    constructor(id: number, success: boolean, message: string) {
      this.id = id;
      this.success = success;
      this.message = message;
    }
  }
  export class ShowFavoritesResponseDto {
    userId: number;    // 사용자의 ID
    movieId: number;   // 영화의 ID
    movieTitle: string; // 영화 제목
    addedAt: Date;     // 관심 목록에 추가된 날짜
  
    constructor(userId: number, movieId: number, movieTitle: string, addedAt: Date) {
      this.userId = userId;
      this.movieId = movieId;
      this.movieTitle = movieTitle;
      this.addedAt = addedAt;
    }
  }
  export class ShowFavoriteByIdResponseDto {
    userId: number;    // 사용자의 ID
    movieId: number;   // 영화의 ID
    movieTitle: string; // 영화 제목
    addedAt: Date;     // 관심 목록에 추가된 날짜
  
    constructor(userId: number, movieId: number, movieTitle: string, addedAt: Date) {
      this.userId = userId;
      this.movieId = movieId;
      this.movieTitle = movieTitle;
      this.addedAt = addedAt;
    }
  }
  
  