import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './service/comment.service';
import { Comment } from './entity/comment.entity';
import { CommentRepository } from './repository/comment.repository';
import { CommentController } from './controller/comment.controller';
import { UserModule } from '../user/user.module';
import { MovieModule } from '../movie/movie.module';
import { FavoriteModule } from '../favorite/favorite.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]), 
    forwardRef(() => UserModule),
    forwardRef(() => FavoriteModule),
    MovieModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  exports: [CommentService, CommentRepository],
})
export class CommentModule {}
