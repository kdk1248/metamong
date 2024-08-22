import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewReplyRepository } from '../repository/reviewreply.repository';
import { ReviewReplyRequestDto } from '../dto/reviewreply-request.dto';
import { ReviewReplyResponseDto } from '../dto/reviewreply-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewReplyEntity } from '../entity/reviewreply.entity';

@Injectable()
export class ReviewReplyService {
  constructor(
    @InjectRepository(ReviewReplyEntity)
    private readonly reviewReplyRepository: ReviewReplyRepository,
  ) {}

  async addReviewReply(reviewReplyRequestDto: ReviewReplyRequestDto): Promise<ReviewReplyResponseDto> {
    const reviewReply = await this.reviewReplyRepository.addReviewReply(reviewReplyRequestDto);
    return new ReviewReplyResponseDto(
      reviewReply.id,
      reviewReply.user.id,
      reviewReply.review.id,
      reviewReply.content,
      reviewReply.createdAt,
    );
  }

  async removeReviewReply(id: number): Promise<ReviewReplyResponseDto> {
    const reviewReply = await this.reviewReplyRepository.findById(id);
    if (!reviewReply) {
      throw new NotFoundException(`ReviewReply with ID ${id} not found`);
    }

    await this.reviewReplyRepository.removeReviewReply(id);
    return new ReviewReplyResponseDto(
      reviewReply.id,
      reviewReply.user.id,
      reviewReply.review.id,
      reviewReply.content,
      reviewReply.createdAt,
    );
  }

  async getReviewRepliesByReviewId(reviewId: number): Promise<ReviewReplyResponseDto[]> {
    const reviewReplies = await this.reviewReplyRepository.findByReviewId(reviewId);
    return reviewReplies.map(reply => new ReviewReplyResponseDto(
      reply.id,
      reply.user.id,
      reply.review.id,
      reply.content,
      reply.createdAt,
    ));
  }
}
