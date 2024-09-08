import { Review } from 'src/res/review/entity/review.entity';
import {Column,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn,} from 'typeorm';
import { ReviewReplyRequestDto } from '../dto/reviewreply-request.dto';
import { CommonBigPKEntity } from 'src/res/common/entity/common.entity';
import { User } from 'src/res/user/entity/user.entity';

@Entity()
export class ReviewReply extends CommonBigPKEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user.replies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Review, (review) => review.replies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'reviewId' })
  review: Review;

  constructor(reviewreplyRequestDto?: ReviewReplyRequestDto) {
    super();
    if (reviewreplyRequestDto) {
      this.content = reviewreplyRequestDto.content;
    }
  }
}
