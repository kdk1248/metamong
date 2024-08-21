import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewModule } from './res/review/review.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './res/review/entity/review.entity';
//UserModule을 생성했기 때문에 AppModule에 등록을 해야 동작하게끔 만듦
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 사용하려는 데이터베이스 타입
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1248',
      database: 'movie',
      entities: [Review], // 엔티티 목록
      synchronize: true, // 개발 환경에서만 사용, 자동으로 데이터베이스 스키마를 동기화합니다.
    }),
    TypeOrmModule.forFeature([Review]), // 특정 엔티티에 대한 레포지토리 등록
    ReviewModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
