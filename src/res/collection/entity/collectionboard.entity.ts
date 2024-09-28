import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Collection } from './collection.entity';
import { User } from 'src/res/user/entity/user.entity';
import { CommonBigPKEntity } from 'src/res/common/entity/common.entity';
import { CollectionBoardRequestDto } from '../dto/collectionboard-request.dto';

@Entity()
export class CollectionBoard extends CommonBigPKEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'bigint', default: 0 })
  like: number;

  @ManyToOne(() => Collection)
  @JoinColumn({ name: 'collectionId' })
  collection: Collection;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor(collectionBoardRequestDto: CollectionBoardRequestDto) {
    super();
    if (collectionBoardRequestDto) {
      this.content = collectionBoardRequestDto.content;
    }
  }

  update(collectionBoardRequestDto: CollectionBoardRequestDto) {
    this.content = collectionBoardRequestDto.content;
  }
}
