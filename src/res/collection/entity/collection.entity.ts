import { CommonBigPKEntity } from 'src/res/common/entity/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CollectionRequestDto } from '../dto/collection-request.dto';

@Entity()
export class Collection extends CommonBigPKEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'bigint' })
  like: number;

  @Column({ type: 'varchar', length: 100 })
  directorId: number;

  @Column({ type: 'text' })
  movieId: number;

  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  modifiedAt: Date;

  constructor(collectionRequestDto: CollectionRequestDto) {
    super();
    if (collectionRequestDto) {
      this.name = collectionRequestDto.name;
      this.directorId = collectionRequestDto.directorId;
      this.movieId = collectionRequestDto.movieId;
    }
  }

  update(collectionRequestDto: CollectionRequestDto) {
    this.name = collectionRequestDto.name;
    this.like = collectionRequestDto.like;
    this.directorId = collectionRequestDto.directorId;
    this.movieId = collectionRequestDto.movieId;
  }
}
