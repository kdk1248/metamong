import { Movie } from 'src/res/movie/entity/movie.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FavoriteRequestDto } from '../dto/favorite-request.dto';
import { CommonBigPKEntity } from 'src/res/common/entity/common.entity';
import { User } from 'src/res/user/entity/user.entity';


@Entity()
export class Favorite extends CommonBigPKEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  addedAt: Date;

  @ManyToOne(() => User, (user) => user.favorite)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.favorite)
  @JoinColumn({ name: 'movieId', referencedColumnName: 'id' })
  movie: Movie;

  constructor(user:User) {
    super();
    if (FavoriteRequestDto) {
      this.user = { id: FavoriteRequestDto.userId } as User;
      this.movie = { id: FavoriteRequestDto.movieId } as Movie;
      this.addedAt = new Date();
    }
  }

  update(favoriteRequestDto: FavoriteRequestDto): void {
    this.user = { id: favoriteRequestDto.userId } as User;
    this.movie = { id: favoriteRequestDto.movieId } as Movie;
    this.addedAt = new Date();
  }
}
