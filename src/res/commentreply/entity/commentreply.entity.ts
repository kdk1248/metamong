import { Comment } from 'src/res/comment/entity/comment.entity';
import {Column,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn,} from 'typeorm';
import { CommentReplyRequestDto } from '../dto/commentreply-request.dto';
import { CommonBigPKEntity } from 'src/res/common/entity/common.entity';
import { User } from 'src/res/user/entity/user.entity';

@Entity()
export class CommentReply extends CommonBigPKEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user.replies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.replies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'commentId' })
  comment: Comment;

  @Column({ default: 0 })
  favoriteCount: number; // 좋아요

  @Column({ default: 0 })
  dislikeCount: number; // 싫어요

  constructor(commentreplyRequestDto?: CommentReplyRequestDto) {
    super();
    if (commentreplyRequestDto) {
      this.content = commentreplyRequestDto.content;
    }
  }
}
