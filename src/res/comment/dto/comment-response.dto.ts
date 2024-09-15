
export class CommentResponseDto {
    user: any;
    constructor(
        public id: number,
        public username: string,
        public content: string,
    ) {}
}
      
