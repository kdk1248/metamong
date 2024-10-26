import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CollectionRequestDto } from '../dto/collection-request.dto';
import { Collection } from '../entity/collection.entity';
import { Movie } from 'src/res/movie/entity/movie.entity';
import { User } from 'src/res/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CollectionRepository extends Repository<Collection> {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(Collection, movieRepository.manager);
  }

  // CREATE
  async createCollection(collectionRequestDto: CollectionRequestDto): Promise<Collection> {
    const { id, userId } = collectionRequestDto;
    
    const user = await this.userRepository.findOneBy({ id: userId });
    const collection = this.create({ id, userId: user });
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
  async updateCollection(collectionRequestDto: CollectionRequestDto): Promise<Collection> {
    const { id, userId } = collectionRequestDto;

    const collection = await this.findOneBy({ id });
    if (!collection) {
      throw new Error(`게시물이 존재하지 않습니다`);
    }

    const user = await this.userRepository.findOneBy({ id: userId });

    this.merge(collection, { id, userId: user });
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
