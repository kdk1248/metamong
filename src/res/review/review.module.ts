import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entity/review.entity'; // 엔티티 임포트
import { ReviewRepository } from './repository/review.repository';
import { ReviewService } from './service/review.service';
import { ReviewController } from './controller/review.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 사용하려는 데이터베이스 타입
      host: 'localhost',
      port: 3306,
      username: 'your-username',
      password: 'your-password',
      database: 'your-database',
      entities: [Review], // 엔티티 목록
      synchronize: true, // 개발 환경에서만 사용, 자동으로 데이터베이스 스키마를 동기화합니다.
    }),
    TypeOrmModule.forFeature([Review]), // 특정 엔티티에 대한 레포지토리 등록
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
})
export class AppModule {}
