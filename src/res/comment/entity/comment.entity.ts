import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonBigPKEntity } from 'src/res/common/entity/common.entity';
import { CommentRequestDto } from '../dto/comment-request.dto';
import { User } from 'src/res/user/entity/user.entity';
import { Favorite } from 'src/res/favorite/entity/favorite.entity';

@Entity()
export class Comment extends CommonBigPKEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: false, nullable: false })
  content: string; // 댓글 내용 저장

  @Column({ nullable: false })
  movieId: string; // 영화 ID 저장

  @ManyToOne(() => User, (user) => user.comments) // 댓글과 사용자 간의 다대일 관계
  user: User; // 댓글을 작성한 사용자

  @JoinColumn({ name: 'userId', referencedColumnName: 'id' }) // 외래 키 칼럼
  replies: any; // 대댓글

  @OneToMany(() => Favorite, favorite => favorite.comment)
  favorite: Favorite[];

  @Column({ default: 0 })
    favoriteCount: number; 

  @Column({ default: 0 })
  dislikeCount: number;

  constructor(commentRequestDto: CommentRequestDto) { // 댓글 요청에서 가져오는 생성자
    super();
    if (commentRequestDto) {
      this.content = commentRequestDto.content; // 댓글 요청에 있는 내용을 여기로 가져옴
      this.movieId = commentRequestDto.movieId; // 영화 ID를 여기로 가져옴
      this.user = { username: commentRequestDto.username } as unknown as User; // 댓글 요청에 있는 사용자 이름을 여기로 가져옴
    }
  }

  update(commentRequestDto: CommentRequestDto): void { // 댓글 수정
    this.content = commentRequestDto.content; // 댓글 요청에 있는 내용
    this.movieId = commentRequestDto.movieId; // 영화 ID 업데이트
    this.user = { username: commentRequestDto.username } as unknown as User; // 사용자 이름 업데이트
  }
}
