export class CommentReplyResponseDto {
    id: number;
    userId: number;
    commentId: number;
    content: string;
    favoriteCount: number;
    dislikeCount: number;
    createdAt: Date;
  
    constructor(id: number, userId: number, commentId: number, content: string, 
      favoriteCount: number, dislikeCount: number, createdAt: Date) {
      
      this.id = id;
      this.userId = userId;
      this.commentId = commentId;
      this.content = content;
      this.favoriteCount = favoriteCount;
      this.dislikeCount = dislikeCount;
      this.createdAt = createdAt;
    }
  }
  