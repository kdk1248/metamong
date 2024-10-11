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
    userId: number;           // 사용자의 ID
    addedAt: Date;            // 관심 목록에 추가된 날짜
    movieId?: number;         // 영화의 ID
    movieTitle?: string;      // 영화 제목
    commentId?: number;       // 댓글의 ID
    commentText?: string;     // 댓글 내용
    collectionId?: number;    // 컬렉션의 ID
    collectionTitle?: string; // 컬렉션 제목
  
    constructor(
      userId: number,
      addedAt: Date,
      movieId?: number,
      movieTitle?: string,
      commentId?: number,
      commentText?: string,
      collectionId?: number,
      collectionTitle?: string,
    ) {
      this.userId = userId;
      this.addedAt = addedAt;
      this.movieId = movieId;
      this.movieTitle = movieTitle;
      this.commentId = commentId;
      this.commentText = commentText;
      this.collectionId = collectionId;
      this.collectionTitle = collectionTitle;
    }
  }
  export class ShowFavoriteByIdResponseDto {
    userId: number;  
    addedAt: Date;          
    movieId?: number;         
    movieTitle?: string;     
    commentId?: number;      
    commentContent?: string;    
    collectionId?: number;   
    collectionName?: string;        
  
    constructor(
      userId: number,
      addedAt: Date,
      movieId?: number,
      movieTitle?: string,
      commentId?: number,
      commentContent?: string,
      collectionId?: number,
      collectionName?: string,
    ) {
      this.userId = userId;
      this.addedAt = addedAt;
      this.movieId = movieId;
      this.movieTitle = movieTitle;
      this.commentId = commentId;
      this.commentContent = commentContent;
      this.collectionId = collectionId;
      this.collectionName = collectionName;
    }
  }
  
  