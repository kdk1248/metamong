export class CommentRequestDto {
  userId: number;       // 사용자 ID
  content: string;      // 댓글 내용
  movieId: number;      // 영화 ID
  createdAt?: Date;     // 댓글 작성 날짜 (선택적)
  updatedAt?: Date;     // 댓글 수정 날짜 (선택적)

  constructor(
    userId: number,
    content: string,
    movieId: number,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.userId = userId;
    this.content = content;
    this.movieId = movieId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
