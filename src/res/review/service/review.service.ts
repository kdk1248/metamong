import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRequestDto } from '../dto/review-request.dto';
import { ReviewResponseDto } from '../dto/review-response.dto';
import { Review } from '../entity/review.entity';
import { ReviewRepository } from '../repository/review.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async createReview(
    reviewRequestDto: ReviewRequestDto,
  ): Promise<ReviewResponseDto> {
    const review = new Review(reviewRequestDto);
    const savedReview = await this.reviewRepository.save(review);
    return new ReviewResponseDto(savedReview.id, savedReview.user.username, savedReview.content);
  }

  async getReviews(): Promise<ReviewResponseDto[]> {
    return await this.reviewRepository.getReviews();
  }

  async updateReview(
    id: number,
    reviewRequestDto: ReviewRequestDto,
  ): Promise<number> {
    await this.reviewRepository.update(id, reviewRequestDto);
    return id;
  }

  async deleteReview(id: number): Promise<number> {
    await this.reviewRepository.delete(id);
    return id;
  }
}
