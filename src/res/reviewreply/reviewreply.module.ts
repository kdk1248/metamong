import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewReply } from './entity/reviewreply.entity';
import { ReviewReplyController } from './controller/reviewreply.controller';
import { ReviewReplyRepository } from './repository/reviewreply.repository';
import { ReviewReplyService } from './service/reviewreply.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewReply])],
  controllers: [ReviewReplyController],
  providers: [ReviewReplyService, ReviewReplyRepository],
  exports: [ReviewReplyService],
})
export class ReviewReplyModule {}
