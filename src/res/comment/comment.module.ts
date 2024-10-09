import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './service/comment.service';
import { Comment } from './entity/comment.entity';
import { User } from 'src/res/user/entity/user.entity';
import { CommentRepository } from './repository/comment.repository';
import { CommentController } from './controller/comment.controller';
import { UserModule } from '../user/user.module';
import { MovieModule } from '../movie/movie.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]),
  forwardRef(() =>UserModule),
  MovieModule,
], 
  controllers: [CommentController],
  providers: [CommentService, CommentRepository], // CommentService와 CommentRepository를 providers에 등록
  exports: [CommentService, CommentRepository], // 필요시 다른 모듈에서도 CommentService를 사용할 수 있도록 export
})
export class CommentModule {}
