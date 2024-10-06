import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
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

  //UPDATE
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
}

