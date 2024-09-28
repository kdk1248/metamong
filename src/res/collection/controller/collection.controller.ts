import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CollectionRequestDto } from '../dto/collection-request.dto';
import { MovieResponseDto } from '../dto/collection-response.dto';
import { CollectionService } from '../service/collection.service';

@Controller('api/collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  // CREATE
  @Post()
  async createCollection(@Body() collectionRequestDto: CollectionRequestDto): Promise<MovieResponseDto> {
    const createdCollection = await this.collectionService.createCollection(collectionRequestDto);
    return new MovieResponseDto(createdCollection);
  }
  
  // READ
  @Get()
  async getCollections(): Promise<MovieResponseDto[]> {
    const collections = await this.collectionService.getCollections();
    return collections.map((collection) => new MovieResponseDto(collection));
  }

  @Get(':id')
  async getCollectionById(@Param('id') id: number): Promise<MovieResponseDto> {
    const collection = await this.collectionService.getCollectionById(id);
    return new MovieResponseDto(collection);
  }

  // UPDATE
  @Put(':id')
  async updateCollection(
    @Param('id') id: number,
    @Body() collectionRequestDto: CollectionRequestDto
  ): Promise<MovieResponseDto> {
    const updatedCollection = await this.collectionService.updateCollection(id, collectionRequestDto);
    return new MovieResponseDto(updatedCollection);
  }
  // DELETE
  @Delete(':id')
  async deleteCollection(@Param('id') id: number): Promise<void> {
    await this.collectionService.deleteCollection(id);
  }
}
