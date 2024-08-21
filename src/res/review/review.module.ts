import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entity/review.entity'; // 엔티티 임포트
import { ReviewRepository } from './repository/review.repository';
import { ReviewService } from './service/review.service';
import { ReviewController } from './controller/review.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity])], // If you are using TypeORM, for example
  providers: [ReviewService],
  exports: [ReviewService],
  controllers: [ReviewController]
})
export class ReviewModule {}

