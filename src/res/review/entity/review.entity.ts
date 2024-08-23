import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonBigPKEntity } from './common/common.entity';
import { ReviewRequestDto } from '../dto/review-request.dto';
import { User } from 'src/res/user/entity/user.entity';

@Entity()
export class Review extends CommonBigPKEntity {
  @Column('text', { unique: false, nullable: false })
  content: string;
  static id: number;
  static username: string;
  static content: string;
  replies: any;
  reply: any;

  @ManyToOne(()=> User, (user)=> user.comments)
  @JoinColumn({name: 'userId', referencedColumnName:'id'})
  user: User;

  constructor(reviewRequestDto: ReviewRequestDto) {
    super();
    if (reviewRequestDto) {
      this.content = reviewRequestDto.content;
      this.user = reviewRequestDto.username;
    }
  }

  update(reviewRequestDto: ReviewRequestDto): void {
    this.content = reviewRequestDto.content;
    this.user = reviewRequestDto.username;
  }
}
