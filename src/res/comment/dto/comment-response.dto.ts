export class CommentResponseDto {
    constructor(
        public id: number,      // 댓글 ID
        public username: string, // 사용자 이름
        public content: string   // 댓글 내용
    ) {}
}
