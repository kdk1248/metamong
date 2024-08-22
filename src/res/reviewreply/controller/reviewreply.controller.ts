import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { ReviewReplyService } from '../service/reviewreply.service';
import { ReviewReplyRequestDto } from '../dto/reviewreply-request.dto';
import { ReviewReplyResponseDto } from '../dto/reviewreply-response.dto';

@Controller('api/review-replies')
export class ReviewReplyController {
  constructor(private readonly reviewReplyService: ReviewReplyService) {}

  @Post('add')
  async addReviewReply(@Body() reviewReplyRequestDto: ReviewReplyRequestDto): Promise<ReviewReplyResponseDto> {
    return await this.reviewReplyService.addReviewReply(reviewReplyRequestDto);
  }

  @Delete('remove/:id')
  async removeReviewReply(@Param('id') id: number): Promise<ReviewReplyResponseDto> {
    return await this.reviewReplyService.removeReviewReply(id);
  }

  @Get('review/:reviewId')
  async getReviewRepliesByReviewId(@Param('reviewId') reviewId: number): Promise<ReviewReplyResponseDto[]> {
    return await this.reviewReplyService.getReviewRepliesByReviewId(reviewId);
  }
}
