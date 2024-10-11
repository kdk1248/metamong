import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieService } from 'src/res/movie/service/movie.service';
import { CollectionRequestDto } from '../dto/collection-request.dto';
import { Collection } from '../entity/collection.entity';
import { CollectionRepository } from '../repository/collection.repository';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: CollectionRepository,
    @Inject(forwardRef(() => MovieService)) private readonly movieService: MovieService,
  ) {}

  // 컬렉션 생성
  async createCollection(collectionRequestDto: CollectionRequestDto): Promise<Collection> {
    const { name, movieIds } = collectionRequestDto; // movieIds가 DTO에 포함돼 있다고 가정
    if (!name) {
      throw new BadRequestException('Collection name is required');
    }
    
    const movies = await this.movieService.findByIds(movieIds); // MovieService로 영화들을 찾음

    const collection = this.collectionRepository.create({
      name,
      ...collectionRequestDto,
      movies, // 영화들을 컬렉션에 추가
    });

    return this.collectionRepository.save(collection);
  }

  // 모든 컬렉션 조회
  async getCollections(): Promise<Collection[]> {
    return this.collectionRepository.find({
      order: {
        modifiedAt: 'DESC',
      },
    });
  }

  // 특정 컬렉션 조회
  async getCollectionById(id: number): Promise<Collection> {
    const collection = await this.collectionRepository.findOneBy({ id });
    if (!collection) {
      throw new NotFoundException(`게시물이 존재하지 않습니다`);
    }
    return collection;
  }

  async collectionExists(id: number): Promise<boolean> {
    const collection = await this.collectionRepository.findOneBy({ id });
    return !!collection; // 존재하면 true, 아니면 false 반환
  }

  // 컬렉션 업데이트
  async updateCollection(
    id: number,
    collectionRequestDto: CollectionRequestDto,
  ): Promise<Collection> {
    const collection = await this.collectionRepository.findOneBy({ id });
    if (!collection) {
      throw new NotFoundException(`게시물이 존재하지 않습니다`);
    }

    this.collectionRepository.merge(collection, collectionRequestDto);
    return this.collectionRepository.save(collection);
  }

  // 컬렉션 삭제
  async deleteCollection(id: number): Promise<void> {
    const result = await this.collectionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`게시물이 존재하지 않습니다`);
    }
  }

  // 컬렉션 검색
  async searchCollections(name: string): Promise<Collection[]> {
    return this.collectionRepository.searchCollections(name);
  }
}
