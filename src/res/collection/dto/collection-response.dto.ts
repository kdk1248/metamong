import { BadRequestException } from '@nestjs/common';
import { MovieResponseDto } from 'src/res/movie/dto/movie-response.dto';
import { Collection } from '../entity/collection.entity';

export class CollectionResponseDto {
    id: number;
    name: string;
    favoriteCount: number;
    movies: MovieResponseDto[];
    createdAt: Date;
    modifiedAt: Date;
    userId: number;

    constructor(collection: Collection) {
        if (!collection) {
            throw new BadRequestException('Invalid collection data');
        }
        
        this.id = collection.id;
        this.name = collection.name;
        this.favoriteCount = collection.favoriteCount || 0;
        this.movies = collection.movies ? collection.movies.map(movie => new MovieResponseDto(movie)) : [];
        this.createdAt = collection.createdAt;
        this.modifiedAt = collection.modifiedAt;
        this.userId = collection.userId ? collection.userId.id : null;
    }
}
