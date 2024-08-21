import { Injectable } from '@nestjs/common';
import { ReviewEntity } from '../entity/review.entity';
import { ReviewRepository } from '../repository/review.repository';
import { ReviewRequestDto } from '../dto/review-request.dto';
import { ReviewResponseDto } from '../dto/review-response.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity) //Review Entity
    private readonly reviewRepository: ReviewRepository
  ) {}

  async createReview(reviewRequestDto: ReviewRequestDto): Promise<ReviewResponseDto> {
    const review = new ReviewEntity();
    // review.username = reviewRequestDto.username;
    review.content = reviewRequestDto.content;
    const savedReview = await this.reviewRepository.save(review);
    return new ReviewResponseDto(ReviewEntity.id, 'dummy', ReviewEntity.content);
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
