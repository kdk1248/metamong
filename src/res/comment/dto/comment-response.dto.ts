export class CommentResponseDto {
  id: number;            // 댓글 ID
  success: boolean;      // 작업 성공 여부
  message: string;       // 클라이언트에게 전달할 메시지

  constructor(id: number, success: boolean, message: string) {
    this.id = id;
    this.success = success;
    this.message = message;
  }
}

export class ShowCommentsResponseDto {
  userId: number;           // 사용자의 ID
  addedAt: Date;            // 댓글 작성 날짜
  commentContent: string;      // 댓글 내용
  favoriteCount: number;    // 좋아요 수
  dislikeCount: number;     // 싫어요 수
  movieId?: number;         // 영화의 ID (optional)
  movieTitle?: string;      // 영화 제목 (optional)

  constructor(
    userId: number,
    addedAt: Date,
    commentContent: string,
    favoriteCount: number,
    dislikeCount: number,
    movieId?: number,
    movieTitle?: string
  ) {
    this.userId = userId;
    this.addedAt = addedAt;
    this.commentContent = commentContent;
    this.favoriteCount = favoriteCount;
    this.dislikeCount = dislikeCount;
    this.movieId = movieId;
    this.movieTitle = movieTitle;
  }
}

export class ShowCommentByIdResponseDto {
  userId: number;           // 사용자의 ID
  addedAt: Date;            // 댓글 작성 날짜
  commentContent: string;   // 댓글 내용
  favoriteCount: number;    // 좋아요 수
  dislikeCount: number;     // 싫어요 수
  movieId?: number;         // 영화의 ID (optional)
  movieTitle?: string;      // 영화 제목 (optional)

  constructor(
    userId: number,
    addedAt: Date,
    commentContent: string,
    favoriteCount: number,
    dislikeCount: number,
    movieId?: number,
    movieTitle?: string
  ) {
    this.userId = userId;
    this.addedAt = addedAt;
    this.commentContent = commentContent;
    this.favoriteCount = favoriteCount;
    this.dislikeCount = dislikeCount;
    this.movieId = movieId;
    this.movieTitle = movieTitle;
  }
}
