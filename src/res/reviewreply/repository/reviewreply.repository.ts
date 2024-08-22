import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewReplyRequestDto } from '../dto/reviewreply-request.dto';
import { ReviewReply } from '../entity/reviewreply.entity';

@Injectable()
export class ReviewReplyRepository {
  constructor(
    @InjectRepository(ReviewReply)
    private readonly reviewReplyRepository: Repository<ReviewReply>,
  ) {}

  async addReviewReply(
    reviewReplyRequestDto: ReviewReplyRequestDto,
  ): Promise<ReviewReply> {
    const reviewReply = this.reviewReplyRepository.create({
      user: { id: reviewReplyRequestDto.userId },
      review: { id: reviewReplyRequestDto.reviewId },
      content: reviewReplyRequestDto.content,
    });
    return await this.reviewReplyRepository.save(reviewReply);
  }

  async removeReviewReply(id: number): Promise<void> {
    await this.reviewReplyRepository.delete(id);
  }

  async findById(id: number): Promise<ReviewReply | null> {
    return await this.reviewReplyRepository.findOne({ where: { id } });
  }

  async findByReviewId(reviewId: number): Promise<ReviewReply[]> {
    return await this.reviewReplyRepository.find({
      where: { review: { id: reviewId } },
      relations: ['user'],
    });
  }
}
