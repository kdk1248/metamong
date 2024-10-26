import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/res/user/entity/user.entity';
import { Movie } from 'src/res/movie/entity/movie.entity';
import { Comment } from 'src/res/comment/entity/comment.entity';
import { Collection } from 'src/res/collection/entity/collection.entity';
import { FavoriteRequestDto } from '../dto/favorite-request.dto';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({name: 'userId'}) 
  user: User;

  @ManyToOne(() => Movie)
  @JoinColumn({name: 'movieId'})
  movie?: Movie;

  @ManyToOne(() => Comment, comment => comment.favorite, { nullable: true })
  comment?: Comment;

  @ManyToOne(() => Collection, collection => collection.favorite, { nullable: true })
  collection?: Collection;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  addedAt: Date;

  constructor(favoriteRequestDto: FavoriteRequestDto) {
    if (favoriteRequestDto) {
      this.user = { id: favoriteRequestDto.userId } as User;
      this.movie = favoriteRequestDto.movieId ? { id: favoriteRequestDto.movieId } as Movie : undefined;
      this.comment = favoriteRequestDto.commentId ? { id: favoriteRequestDto.commentId } as Comment : undefined;
      this.collection = favoriteRequestDto.collectionId ? { id: favoriteRequestDto.collectionId } as Collection : undefined;
      this.addedAt = new Date();
    }
  }

  update(favoriteRequestDto: FavoriteRequestDto): void {
    this.user = { id: favoriteRequestDto.userId } as User;
    this.movie = favoriteRequestDto.movieId ? { id: favoriteRequestDto.movieId } as Movie : undefined;
    this.comment = favoriteRequestDto.commentId ? { id: favoriteRequestDto.commentId } as Comment : undefined;
    this.collection = favoriteRequestDto.collectionId ? { id: favoriteRequestDto.collectionId } as Collection : undefined;
    this.addedAt = new Date();
  }
}
