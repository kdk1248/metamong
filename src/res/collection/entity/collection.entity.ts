import { CommonBigPKEntity } from 'src/res/common/entity/common.entity';
import { Movie } from 'src/res/movie/entity/movie.entity';
import { User } from 'src/res/user/entity/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CollectionRequestDto } from '../dto/collection-request.dto';
import { Favorite } from 'src/res/favorite/entity/favorite.entity';

@Entity()
export class Collection extends CommonBigPKEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => User, (user) => user.collections, { eager: true })
  @JoinColumn({ name: 'userId' })
  userId: User;

  @ManyToMany(() => Movie, (movie) => movie.collections)
  @JoinTable()
  movies: Movie[];
  
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @OneToMany(() => Favorite, favorite => favorite.collection)
  favorite: Favorite[];

  @Column({ type: 'bigint', default: 0 })
  favoriteCount: number;
  
  @Column({ default: false })
  isShared: boolean;

  constructor(collectionRequestDto: CollectionRequestDto) {
    super();
    if (collectionRequestDto) {
      this.id = collectionRequestDto.id;
    }
  }

  update(collectionRequestDto: CollectionRequestDto) {
    this.id = collectionRequestDto.id;
  }
}
