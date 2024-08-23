import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonBigPKEntity } from './common/common.entity';
import { ReviewRequestDto } from '../dto/review-request.dto';
import { User } from 'src/res/user/entity/user.entity';

@Entity()
export class Review extends CommonBigPKEntity {
  @Column('text', { unique: false, nullable: false })
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
  replies: any;

  constructor(reviewRequestDto: ReviewRequestDto) {
    super();
    if (reviewRequestDto) {
      this.content = reviewRequestDto.content;
      this.user = { id: reviewRequestDto.user } as unknown as User;
    }
  }

  update(reviewRequestDto: ReviewRequestDto): void {
    this.content = reviewRequestDto.content;
    this.user = { id: reviewRequestDto.user } as unknown as User;
  }
}
