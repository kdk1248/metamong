import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ReviewService } from '../service/review.service';
import { ReviewRequestDto } from '../dto/review-request.dto';
import { ReviewResponseDto } from '../dto/review-response.dto';

@Controller('api') //클래스가 컨트롤러라는 데코레이터, 기본 url 경로는 api로 설정한거임
export class ReviewController { //클래스 선언 리뷰 관련 api를 관리하는 역할
  constructor(private readonly reviewService: ReviewService) {} //생성자를 통해 ReviewService 를 의존성 주입함,
  /** // reviewService는 컨트롤러에서 사용가능, 비지니스 로직 수행
   * CREATE
   * @param reviewRequestDto
   * @returns Promise<ReviewResponseDto>
   */
  @Post('reviews') // /api/review4s 경로에 대한 요청 처리 -> 리뷰 생성과 연관
  async createReview(@Body() reviewRequestDto: ReviewRequestDto): Promise<ReviewResponseDto> { //createReview 메서드 선언
    return await this.reviewService.createReview(reviewRequestDto); // 메서드 호출하고 리뷰 생성하고 결과 반환
  }

  /**
   * READ
   * @returns Promise<ReviewResponseDto[]>
   */
  @Get('reviews') //리뷰 조회하는 기능 
  async getReviews(): Promise<ReviewResponseDto[]> { //getReviews메서드 선언, 비동기 함수, Review4ResponseDto 배열을 반환
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
