import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CollectionRequestDto } from '../dto/collection-request.dto';
import { CollectionResponseDto } from '../dto/collection-response.dto';
import { CollectionService } from '../service/collection.service';
import { Collection } from '../entity/collection.entity';

@Controller('api/collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  // CREATE
  @Post()
  async createCollection(@Body() collectionRequestDto: CollectionRequestDto): Promise<Collection> {
    return this.collectionService.createCollection(collectionRequestDto);
  }
  
  // READ
  @Get()
  async getCollections(): Promise<CollectionResponseDto[]> {
    const collections = await this.collectionService.getCollections();
    return collections.map((collection) => new CollectionResponseDto(collection));
  }

  @Get(':id')
  async getCollectionById(@Param('id') id: number): Promise<CollectionResponseDto> { 
    const collection = await this.collectionService.getCollectionById(id);
    return new CollectionResponseDto(collection); 
  }

  // UPDATE
  @Put(':id')
  async updateCollection(
    @Param('id') id: number,
    @Body() collectionRequestDto: CollectionRequestDto
  ): Promise<CollectionResponseDto> { 
    const updatedCollection = await this.collectionService.updateCollection(id, collectionRequestDto);
    return new CollectionResponseDto(updatedCollection); 
  }

  // DELETE
  @Delete(':id')
  async deleteCollection(@Param('id') id: number): Promise<void> {
    const collectionExists = await this.collectionService.collectionExists(id);
    if (!collectionExists) {
      throw new NotFoundException(`Collection with id ${id} not found`);
    }
    await this.collectionService.deleteCollection(id);
  }

  // 영화 컬렉션에 추가
  @Post(':collectionId/movies/:movieId')
  async addMovieToCollection(
    @Param('collectionId') collectionId: number,
    @Param('movieId') movieId: number
  ): Promise<CollectionResponseDto> {
    const updatedCollection = await this.collectionService.addMovieToCollection(collectionId, movieId);
    return new CollectionResponseDto(updatedCollection);
  }

  // 컬렉션에서 영화 삭제
  @Delete(':collectionId/movies/:movieId')
  async removeMovieFromCollection(
    @Param('collectionId') collectionId: number,
    @Param('movieId') movieId: number
  ): Promise<CollectionResponseDto> {
    const updatedCollection = await this.collectionService.removeMovieFromCollection(collectionId, movieId);
    return new CollectionResponseDto(updatedCollection);
   }
      
  // SEARCH
  @Get('/search')
  async searchCollections(@Query('name') name: string): Promise<CollectionResponseDto[]> {
    const collections = await this.collectionService.searchCollections(name);
    return collections.map((collection) => new CollectionResponseDto(collection));
  }

  // 좋아요, 좋아요 취소
  @Post(':id/favorite')
  async favoriteCollection(@Param('id') id: number): Promise<CollectionResponseDto> {
    const updatedCollection = await this.collectionService.incrementFavoriteCount(id);
    return new CollectionResponseDto(updatedCollection);
  }

  @Delete(':id/favorite')
  async unfavoriteCollection(@Param('id') id: number): Promise<CollectionResponseDto> {
    const updatedCollection = await this.collectionService.decrementFavoriteCount(id);
    return new CollectionResponseDto(updatedCollection);
  }

  /// 공유된 컬렉션만 가져오는 API
  @Get('shared')
  async getSharedCollections() {
    return this.collectionService.getSharedCollections();
  }

  // 컬렉션 공유 API
  @Post('share/:id')
  async shareCollection(@Param('id') collectionId: number) {
    await this.collectionService.shareCollection(collectionId);
    return { message: '컬렉션이 공유되었습니다.' };
  }
}

