export class CommentResponseDto {
    constructor(
        public id: number,       // 댓글 ID
        public username: string, // 사용자 이름
        public content: string,   // 댓글 내용
        public favoriteCount: number,
        public dislikeCount: number // 싫어요
    ) {}
}
