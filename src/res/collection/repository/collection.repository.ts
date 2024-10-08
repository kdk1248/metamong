import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CollectionRequestDto } from '../dto/collection-request.dto';
import { Collection } from '../entity/collection.entity';
import { Movie } from 'src/res/movie/entity/movie.entity';
import { User } from 'src/res/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CollectionRepository extends Repository<Collection> {

  @InjectRepository(Movie)
  private movieRepository: Repository<Movie>;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  // CREATE
  async createCollection(collectionRequestDto: CollectionRequestDto): Promise<Collection> {
    const { name, movieIds, userId } = collectionRequestDto;
    
    const collection = this.create(collectionRequestDto);
    return this.save(collection);
  }

  // READ
  async getCollections(): Promise<Collection[]> {
    return this.find({
      order: {
        modifiedAt: 'DESC',
      },
    });
  }

  async getCollectionById(id: number): Promise<Collection> {
    const collection = await this.findOneBy({ id });
    if (!collection) {
      throw new Error(`게시물이 존재하지 않습니다`);
    }
    return collection;
  }

  // UPDATE
  async updateCollection(id: number, collectionRequestDto: CollectionRequestDto): Promise<Collection> {
    const { name, movieIds, userId } = collectionRequestDto;

    const collection = await this.findOneBy({ id });
    if (!collection) {
        throw new Error(`게시물이 존재하지 않습니다`);
    }

    const movies = await this.movieRepository.find({
        where: { id: In(movieIds) },
    });

    // user를 설정하는 부분 제거
    this.merge(collection, { name, movies }); // user는 더 이상 포함되지 않음
    return this.save(collection);
}

  // DELETE
  async deleteCollection(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new Error(`게시물이 존재하지 않습니다`);
    }
  }

  // SEARCH
  async searchCollections(name: string): Promise<Collection[]> {
    return this.createQueryBuilder('collection')
      .where('collection.name LIKE :name', { name: `%${name}%` })
      .orderBy('collection.modifiedAt', 'DESC')
      .getMany();
  }
}
