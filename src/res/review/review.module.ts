import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewController } from './controller/review.controller';
import { Review } from './entity/review.entity'; // 엔티티 임포트
import { ReviewService } from './service/review.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [ReviewService],
  exports: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
