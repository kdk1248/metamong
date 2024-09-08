import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ReviewService } from '../service/review.service';
import { ReviewRequestDto } from '../dto/review-request.dto';
import { ReviewResponseDto } from '../dto/review-response.dto';

@Controller('api')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  /**
   * CREATE
   * @param reviewRequestDto
   * @returns Promise<ReviewResponseDto>
   */
  @Post('reviews')
  async createReview(@Body() reviewRequestDto: ReviewRequestDto): Promise<ReviewResponseDto> {
    return await this.reviewService.createReview(reviewRequestDto);
  }

  /**
   * READ
   * @returns Promise<ReviewResponseDto[]>
   */
  @Get('reviews')
  async getReviews(): Promise<ReviewResponseDto[]> {
    return await this.reviewService.getReviews();
  }

  /**
   * UPDATE
   * @param id
   * @param reviewRequestDto
   * @returns Promise<number>
   */
  @Put('reviews/:id')
  async updateReview(
    @Param('id') id: number,
    @Body() reviewRequestDto: ReviewRequestDto,
  ): Promise<number> {
    return await this.reviewService.updateReview(id, reviewRequestDto);
  }

  /**
   * DELETE
   * @param id
   * @returns Promise<number>
   */
  @Delete('reviews/:id')
  async deleteReview(@Param('id') id: number): Promise<number> {
    return await this.reviewService.deleteReview(id);
  }
}
