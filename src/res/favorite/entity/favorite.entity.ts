import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonBigPKEntity } from './common/common.entity';
import { FavoriteRequestDto } from '../dto/favorite-request.dto';
import { MovieEntity } from 'src/res/movie/entity/movie.entity';
// import { UserEntity } from './user.entity';
// import { MovieEntity } from './movie.entity';

@Entity('Favorite')
export class FavoriteEntity extends CommonBigPKEntity {
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  addedAt: Date;

  // @ManyToOne(() => UserEntity, (user) => user.favorites)
  // @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  // user: UserEntity;

  @ManyToOne(() => MovieEntity, (movie) => movie.favorite)
  @JoinColumn({ name: 'movieId', referencedColumnName: 'id' })
  movie: MovieEntity;

//   user: any;

  constructor(favoriteRequestDto?: FavoriteRequestDto) {
    super();
    if (favoriteRequestDto) {
      // this.user = { id: favoriteRequestDto.userId } as UserEntity;
      this.movie = { id: favoriteRequestDto.movieId } as MovieEntity;
      this.addedAt = new Date();
    }
  }

  update(favoriteRequestDto: FavoriteRequestDto): void {
    // this.user = { id: favoriteRequestDto.userId } as UserEntity;
    this.movie = { id: favoriteRequestDto.movieId } as MovieEntity;
    this.addedAt = new Date();
  }
}
