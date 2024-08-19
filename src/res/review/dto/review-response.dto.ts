import { Review } from '../entity/review.entity';

export class ReviewResponseDto {
    constructor(
        public id: number,
        public username: string,
        public contents: string,
    ) {}
}
      
