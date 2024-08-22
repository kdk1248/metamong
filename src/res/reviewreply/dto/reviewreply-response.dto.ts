export class ReviewReplyResponseDto {
    id: number;
    userId: number;
    reviewId: number;
    content: string;
    createdAt: Date;
  
    constructor(id: number, userId: number, reviewId: number, content: string, createdAt: Date) {
      this.id = id;
      this.userId = userId;
      this.reviewId = reviewId;
      this.content = content;
      this.createdAt = createdAt;
    }
  }
  