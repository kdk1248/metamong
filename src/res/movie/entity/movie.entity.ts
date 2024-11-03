import { CommonBigPKEntity } from 'src/res/common/entity/common.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Collection } from 'src/res/collection/entity/collection.entity';
import { Favorite } from 'src/res/favorite/entity/favorite.entity';
import { Comment } from 'src/res/comment/entity/comment.entity';
import { MovieRequestDto } from '../dto/movie-request.dto';

@Entity()
export class Movie extends CommonBigPKEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  directorName: string;

  @Column({ type: 'varchar', length: 100 })
  genre: string;

  @Column({ type: 'text' })
  contents: string;

  @Column({ type: 'varchar', length: 255 })
  posterUrl: string;

  @Column({ type: 'varchar', length: 255 })
  stillUrl: string;

  @Column({ type: 'int' })
  runningTime: number;

  @Column({ type: 'varchar', length: 100 })
  nation: string;

  @Column({ type: 'varchar', length: 255 })
  company: string;

  @Column({ type: 'boolean' })
  ratedYn: boolean;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @Column({ type: 'varchar', length: 255 })
  actor: string;

  @Column({ type: 'timestamp', nullable: true })
  releasedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  modifiedAt: Date;

  @OneToMany(() => Favorite, (favorite) => favorite.movie, { eager: false })
  favorite: Favorite[];

  @ManyToMany(() => Collection, (collection) => collection.movies)
  @JoinTable()
  collections: Collection[];

  @OneToMany(() => Comment, (comment) => comment.movie, { eager: false })
  comments: Comment[]; // Comment와의 관계 설정

  constructor(movieRequestDto: MovieRequestDto) {
    super();
    if (movieRequestDto) {
      this.title = movieRequestDto.title;
      this.directorName = movieRequestDto.directorName;
      this.genre = movieRequestDto.genre;
      this.contents = movieRequestDto.contents;
      this.posterUrl = movieRequestDto.posterUrl;
      this.runningTime = movieRequestDto.runningTime;
    }
  }

  update(movieRequestDto: MovieRequestDto) {
    this.title = movieRequestDto.title;
    this.directorName = movieRequestDto.directorName;
    this.genre = movieRequestDto.genre;
    this.contents = movieRequestDto.contents;
    this.posterUrl = movieRequestDto.posterUrl;
    this.runningTime = movieRequestDto.runningTime;
  }
}
