import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CommonBigPKEntity } from 'src/res/common/entity/common.entity';
import { CommentRequestDto } from '../dto/comment-request.dto';
import { User } from 'src/res/user/entity/user.entity';
import { Favorite } from 'src/res/favorite/entity/favorite.entity';
import { Movie } from 'src/res/movie/entity/movie.entity';

@Entity()
export class Comment extends CommonBigPKEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.comments, { nullable: true, eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;
  

  @ManyToOne(() => Movie, (movie) => movie.comments, { nullable: true }) // Movie와의 관계 설정
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @OneToMany(() => Favorite, (favorite) => favorite.comment)
  favorite: Favorite[];

  @Column('text', { unique: false, nullable: false })
  commentContent: string;

  @Column({ default: 0 })
  favoriteCount: number;

  @Column({ default: 0 })
  dislikeCount: number;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', precision: 0 })
  // createdAt: Date;

  
  constructor(commentRequestDto?: CommentRequestDto) {
    super();
    if (commentRequestDto) {
      this.user = { id: commentRequestDto.userId } as User;
      this.movie = { id: commentRequestDto.movieId } as Movie; // Movie 속성 설정
      this.commentContent = commentRequestDto.commentContent;
      this.createdAt = new Date();
    }
  }

  update(commentRequestDto: CommentRequestDto): void {
    this.commentContent = commentRequestDto.commentContent;
    this.movie = { id: commentRequestDto.movieId } as Movie;
  }
}
