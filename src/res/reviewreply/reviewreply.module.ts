import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewReplyEntity } from './entity/reviewreply.entity';
// import { UserEntity } from '../entity/user.entity';  // UserEntity import
import { ReviewReplyRepository } from './repository/reviewreply.repository';
import { ReviewReplyService } from './service/reviewreply.service';
import { ReviewReplyController } from './controller/reviewreply.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewReplyEntity]),
  ],
  controllers: [ReviewReplyController],
  providers: [ReviewReplyService, ReviewReplyRepository],
  exports: [ReviewReplyService],
})
export class ReviewReplyModule {}
