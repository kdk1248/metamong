export class CommentResponseDto {
    constructor(
        public id: number,       // 댓글 ID
        public userId: number | null, // 사용자 ID (null 가능)
        public content: string,   // 댓글 내용
        public favoriteCount: number,
        public dislikeCount: number // 싫어요
    ) {}
}
