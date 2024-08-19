import { Injectable } from '@nestjs/common';
import { Review } from '../entity/review.entity';
import { ReviewRepository } from '../repository/review.repository';
import { ReviewRequestDto } from '../dto/review-request.dto';
import { ReviewResponseDto } from '../dto/review-response.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async createReview(reviewRequestDto: ReviewRequestDto): Promise<ReviewResponseDto> {
    const review = new Review();
    review.username = reviewRequestDto.username;
    review.contents = reviewRequestDto.contents;
    const savedReview = await this.reviewRepository.save(review);
    return new ReviewResponseDto(savedReview.id, savedReview.username, savedReview.contents);
  }

  async getReviews(): Promise<ReviewResponseDto[]> {
    return await this.reviewRepository.getReviews();
  }

  async updateReview(id: number, reviewRequestDto: ReviewRequestDto): Promise<number> {
    await this.reviewRepository.update(id, reviewRequestDto);
    return id;
  }

  async deleteReview(id: number): Promise<number> {
    await this.reviewRepository.delete(id);
    return id;
  }
}
