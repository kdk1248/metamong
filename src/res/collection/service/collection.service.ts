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
    const collection = await this.collectionRepository.findOne({
      where: { id: collectionId },
      relations: ['movies'],  // 'movies' 관계를 명시적으로 로드
    });
  
    if (!collection) {
      throw new NotFoundException(`컬렉션이 존재하지 않습니다`);
    }
  
    const movie = await this.movieService.getMovieById(movieId);
    if (!movie) {
      throw new NotFoundException(`영화가 존재하지 않습니다`);
    }
  
    // 영화 ID만 추가
    collection.movies = collection.movies || [];
    if (!collection.movies.some(existingMovie => existingMovie.id === movie.id)) {
      collection.movies.push(movie); // 중복 영화가 없을 때만 추가
    }
  
    return this.collectionRepository.save(collection);
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
    relations: ['movies'],
    order: {
      modifiedAt: 'DESC',
    },
  });
}

 // 특정 컬렉션 조회
async getCollectionById(id: number): Promise<Collection> {
  const collection = await this.collectionRepository.findOne({
    where: { id },
    relations: ['movies'],
  });
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

  // 공유된 컬렉션을 가져오는 메서드
  async getSharedCollections(): Promise<Collection[]> {
    return this.collectionRepository.find({
      where: { isShared: true },
    });
  }

  // 컬렉션 공유 메서드
  async shareCollection(collectionId: number): Promise<void> {
    const collection = await this.collectionRepository.findOne({
      where: { id: collectionId },
    });

    if (!collection) {
      throw new Error('컬렉션을 찾을 수 없습니다.');
    }

    collection.isShared = true;  // isShared를 true로 업데이트
    await this.collectionRepository.save(collection);  // 업데이트된 컬렉션 저장
  }
}