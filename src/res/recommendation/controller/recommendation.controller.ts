import { Controller, Get, Param } from '@nestjs/common';
import { RecommendationService } from '../service/recommendation.service';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  // 사용자가 추천을 받을 수 있는 엔드포인트
  @Get(':userId')
  async recommend(@Param('userId') userId: number) {
    return this.recommendationService.recommendMovies(userId);
  }
}
