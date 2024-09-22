import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CollectionRequestDto } from '../dto/collection-request.dto';
import { Collection } from '../entity/collection.entity';

@Injectable()
export class CollectionRepository extends Repository<Collection> {

  // 컬렉션 생성
  async createCollection(collectionRequestDto: CollectionRequestDto): Promise<Collection> {
    const collection = this.create(collectionRequestDto);
    return this.save(collection);
  }

  // 모든 컬렉션 조회
  async getCollections(): Promise<Collection[]> {
    return this.find({
      order: {
        modifiedAt: 'DESC',
      },
    });
  }

  // 특정 컬렉션 조회
  async getCollectionById(id: number): Promise<Collection> {
    const collection = await this.findOneBy({ id });
    if (!collection) {
      throw new Error(`Collection with id ${id} not found`);
    }
    return collection;
  }

  // 컬렉션 업데이트
  async updateCollection(id: number, collectionRequestDto: CollectionRequestDto): Promise<Collection> {
    const collection = await this.findOneBy({ id });
    if (!collection) {
      throw new Error(`Collection with id ${id} not found`);
    }

    this.merge(collection, collectionRequestDto);
    return this.save(collection);
  }

  // 컬렉션 삭제
  async deleteCollection(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new Error(`Collection with id ${id} not found`);
    }
  }
}
