import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewReplyEntity } from '../entity/reviewreply.entity';
import { ReviewReplyRequestDto } from '../dto/reviewreply-request.dto';

@Injectable()
export class ReviewReplyRepository {
  constructor(
    @InjectRepository(ReviewReplyEntity)
    private readonly reviewReplyRepository: Repository<ReviewReplyEntity>,
  ) {}

  async addReviewReply(reviewReplyRequestDto: ReviewReplyRequestDto): Promise<ReviewReplyEntity> {
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

  async findById(id: number): Promise<ReviewReplyEntity | null> {
    return await this.reviewReplyRepository.findOne({ where: { id } });
  }

  async findByReviewId(reviewId: number): Promise<ReviewReplyEntity[]> {
    return await this.reviewReplyRepository.find({
      where: { review: { id: reviewId } },
      relations: ['user'],
    });
  }
}
