import { CommonBigPKEntity } from 'src/res/common/entity/common.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CollectionRequestDto } from '../dto/collection-request.dto';

@Entity()
export class Collection extends CommonBigPKEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'bigint', default: 0 })
  like: number;

  @Column({ type: 'json' })
  movieIds: number[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  constructor(collectionRequestDto: CollectionRequestDto) {
    super();
    if (collectionRequestDto) {
      this.name = collectionRequestDto.name;
      this.movieIds = collectionRequestDto.movieIds;
    }
  }

  update(collectionRequestDto: CollectionRequestDto) {
    this.name = collectionRequestDto.name;
    this.movieIds = collectionRequestDto.movieIds;
  }
}