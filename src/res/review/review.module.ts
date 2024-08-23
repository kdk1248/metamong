import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from './service/review.service';
import { Review } from './entity/review.entity';
import { User } from 'src/res/user/entity/user.entity';
import { ReviewRepository } from './repository/review.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User])], // Review와 User 엔티티를 TypeORM 모듈에 등록
  providers: [ReviewService, ReviewRepository], // ReviewService와 ReviewRepository를 providers에 등록
  exports: [ReviewService], // 필요시 다른 모듈에서도 ReviewService를 사용할 수 있도록 export
})
export class ReviewModule {}
