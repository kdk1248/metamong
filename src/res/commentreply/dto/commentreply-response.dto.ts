export class CommentReplyResponseDto {
    id: number;
    userId: number;
    commentId: number;
    content: string;
    createdAt: Date;
  
    constructor(id: number, userId: number, commentId: number, content: string, createdAt: Date) {
      this.id = id;
      this.userId = userId;
      this.commentId = commentId;
      this.content = content;
      this.createdAt = createdAt;
    }
  }
  