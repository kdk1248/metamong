import { Movie } from 'src/res/movie/entity/movie.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { FavoriteRequestDto } from '../dto/favorite-request.dto';
import { CommonBigPKEntity } from './common/common.entity';
// import { UserEntity } from './user.entity';
// import { MovieEntity } from './movie.entity';

@Entity()
export class Favorite extends CommonBigPKEntity {
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  addedAt: Date;

  // @ManyToOne(() => UserEntity, (user) => user.favorites)
  // @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  // user: UserEntity;

  @ManyToOne(() => Movie, (movie) => movie.favorite)
  @JoinColumn({ name: 'movieId', referencedColumnName: 'id' })
  movie: Movie;

  //   user: any;

  constructor(favoriteRequestDto?: FavoriteRequestDto) {
    super();
    if (favoriteRequestDto) {
      // this.user = { id: favoriteRequestDto.userId } as UserEntity;
      this.movie = { id: favoriteRequestDto.movieId } as Movie;
      this.addedAt = new Date();
    }
  }

  update(favoriteRequestDto: FavoriteRequestDto): void {
    // this.user = { id: favoriteRequestDto.userId } as UserEntity;
    this.movie = { id: favoriteRequestDto.movieId } as Movie;
    this.addedAt = new Date();
  }
}
