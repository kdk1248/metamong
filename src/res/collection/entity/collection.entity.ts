import { CommonBigPKEntity } from 'src/res/common/entity/common.entity';
import { Movie } from 'src/res/movie/entity/movie.entity';
import { User } from 'src/res/user/entity/user.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CollectionRequestDto } from '../dto/collection-request.dto';

@Entity()
export class Collection extends CommonBigPKEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'bigint', default: 0 })
  like: number;

  @ManyToMany(() => User, (user) => user.collections)
  users: User[];

  @ManyToMany(() => Movie, (movie) => movie.collections)
  @JoinTable()
  movies: Movie[];
  
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  constructor(collectionRequestDto: CollectionRequestDto) {
    super();
    if (collectionRequestDto) {
      this.name = collectionRequestDto.name;
    }
  }

  update(collectionRequestDto: CollectionRequestDto) {
    this.name = collectionRequestDto.name;
  }
}
