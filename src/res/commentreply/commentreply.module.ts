import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentReply } from './entity/commentreply.entity';
import { CommentReplyController } from './controller/commentreply.controller';
import { CommentReplyRepository } from './repository/commentreply.repository';
import { CommentReplyService } from './service/commentreply.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentReply])],
  controllers: [CommentReplyController],
  providers: [CommentReplyService, CommentReplyRepository],
  exports: [CommentReplyService],
})
export class CommentReplyModule {}
