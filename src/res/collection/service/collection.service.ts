import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieService } from 'src/res/movie/service/movie.service';
import { CollectionRequestDto } from '../dto/collection-request.dto';
import { Collection } from '../entity/collection.entity';
import { CollectionRepository } from '../repository/collection.repository';
import { User } from 'src/res/user/entity/user.entity';
import { UserRepository } from 'src/res/user/repository/user.repository';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: CollectionRepository,
    @Inject(forwardRef(() => UserRepository))
    private readonly userRepository: UserRepository,
    private readonly movieService: MovieService,
  ) {}

  // 컬렉션 생성
  async createCollection(collectionRequestDto: CollectionRequestDto): Promise<Collection> {
    const { userId } = collectionRequestDto;

    const collection = this.collectionRepository.create({
        ...collectionRequestDto,
        userId: { id: userId },
    });
    return this.collectionRepository.save(collection);
  }

  // 컬렉션에 특정 영화 추가
  async addMovieToCollection(collectionId: number, movieId: number): Promise<Collection> {
    const collection = await this.collectionRepository.findOneBy({ id: collectionId });
    if (!collection) {
      throw new NotFoundException(`컬렉션이 존재하지 않습니다`);
    }

    const movie = await this.movieService.getMovieById(movieId);

    collection.movies = [...collection.movies, movie]; // 단일 객체로 추가
    return this.collectionRepository.save(collection); // 변경 사항 저장
  }

  // 컬렉션에서 특정 영화 삭제
  async removeMovieFromCollection(collectionId: number, movieId: number): Promise<Collection> {
    const collection = await this.collectionRepository.findOneBy({ id: collectionId });
    if (!collection) {
      throw new NotFoundException(`컬렉션이 존재하지 않습니다`);
    }

    collection.movies = collection.movies.filter(movie => movie.id !== movieId); // 특정 영화 삭제
    return this.collectionRepository.save(collection); // 변경 사항 저장
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
  // userId는 병합하지 않고, 필요한 다른 속성만 업데이트합니다.
  const { userId, ...updateData } = collectionRequestDto;
  
  this.collectionRepository.merge(collection, updateData); // userId를 제외한 나머지 속성만 병합합니다.
  
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

  // 컬렉션 좋아요 (개수)
  async incrementFavoriteCount(collectionId: number): Promise<Collection> {
    const collection = await this.collectionRepository.findOne({ where: { id: collectionId } });

    collection.favoriteCount = (collection.favoriteCount || 0) + 1;
    return this.collectionRepository.save(collection);
  }

  // 컬렉션 좋아요 취소
  async decrementFavoriteCount(collectionId: number): Promise<Collection> {
    const collection = await this.collectionRepository.findOne({ where: { id: collectionId } });

    collection.favoriteCount = Math.max((collection.favoriteCount || 0) - 1, 0);
    return this.collectionRepository.save(collection);
  }



}
