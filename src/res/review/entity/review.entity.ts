import { ReviewRequestDto } from '../dto/review-request.dto';

export class Review {
  id: number;
  username: string;
  contents: string;

  constructor(reviewRequestDto?: ReviewRequestDto) {
    if (reviewRequestDto) {
      this.username = reviewRequestDto.username;
      this.contents = reviewRequestDto.contents;
    }
  }

  update(reviewRequestDto: ReviewRequestDto): void {
    this.username = reviewRequestDto.username;
    this.contents = reviewRequestDto.contents;
  }
}
