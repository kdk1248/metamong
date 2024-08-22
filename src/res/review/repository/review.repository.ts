import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewRequestDto } from '../dto/review-request.dto';
import { ReviewResponseDto } from '../dto/review-response.dto';
import { Review } from '../entity/review.entity';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async save(review: Review): Promise<Review> {
    try {
      return await this.reviewRepository.save(review);
    } catch (error) {
      throw new Error('Failed to save the review');
    }
  }

  async getReviews(): Promise<ReviewResponseDto[]> {
    try {
      const reviews = await this.reviewRepository.find();
      return reviews.map(
        (review) => new ReviewResponseDto(review.id, 'dummy', review.content),
      );
    } catch (error) {
      throw new Error('Failed to retrieve reviews');
    }
  }

  async update(id: number, reviewRequestDto: ReviewRequestDto): Promise<void> {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    try {
      await this.reviewRepository.update(id, {
        // username: reviewRequestDto.username,
        content: reviewRequestDto.content,
      });
    } catch (error) {
      throw new Error(`Failed to update the review with ID ${id}`);
    }
  }

  async delete(id: number): Promise<void> {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    try {
      await this.reviewRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete the review with ID ${id}`);
    }
  }

  async findById(id: number): Promise<Review | null> {
    try {
      const review = await this.reviewRepository.findOne({ where: { id } });
      if (!review) {
        return null;
      }
      return review;
    } catch (error) {
      throw new Error(`Failed to find the review with ID ${id}`);
    }
  }
}
