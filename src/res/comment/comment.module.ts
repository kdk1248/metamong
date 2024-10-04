import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './service/comment.service';
import { Comment } from './entity/comment.entity';
import { User } from 'src/res/user/entity/user.entity';
import { CommentRepository } from './repository/comment.repository';
import { CommentController } from './controller/comment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User])], // Comment와 User 엔티티를 TypeORM 모듈에 등록
  controllers: [CommentController],
  providers: [CommentService, CommentRepository], // CommentService와 CommentRepository를 providers에 등록
  exports: [CommentService], // 필요시 다른 모듈에서도 CommentService를 사용할 수 있도록 export
})
export class CommentModule {}
