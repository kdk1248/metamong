export class CommentRequestDto {
  userId: number;       // 사용자의 ID
  movieId: number;      // 영화의 ID
  commentContent: string;
  createdAt?: Date;     // 댓글 작성 날짜 (optional)
  updatedAt?: Date;     // 댓글 수정 날짜 (optional)

  constructor(
    userId: number,
    movieId: number,
    commentContent: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.userId = userId;
    this.movieId = movieId;
    this.commentContent = commentContent;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}