import { ReviewEntity } from 'src/res/review/entity/review.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReviewReplyRequestDto } from '../dto/reviewreply-request.dto';
import { CommonBigPKEntity } from './common/common.entity';
// import { UserEntity } from './entity/user.entity';

@Entity('review_replies')
export class ReviewReplyEntity extends CommonBigPKEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  // @ManyToOne(() => UserEntity, (user) => user.replies, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'userId' })
  // user: UserEntity;

  @ManyToOne(() => ReviewEntity, (review) => review.replies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'reviewId' })
  review: ReviewEntity;

  constructor(reviewreplyRequestDto?: ReviewReplyRequestDto) {
    super();
    if (reviewreplyRequestDto) {
      this.content = reviewreplyRequestDto.content;
    }
  }

  user: any;
}
