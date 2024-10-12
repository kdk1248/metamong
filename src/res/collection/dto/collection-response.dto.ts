import { Collection } from '../entity/collection.entity';
import { MovieResponseDto } from 'src/res/movie/dto/movie-response.dto'; 

export class CollectionResponseDto {
    id: number;
    name: string;
    favoriteCount: number;
    movies: MovieResponseDto[];
    createdAt: Date;
    modifiedAt: Date;

    constructor(collection: Collection) {
        this.id = collection.id;
        this.name = collection.name;
        this.favoriteCount = collection.favoriteCount;
        this.movies = collection.movies.map(movie => new MovieResponseDto(movie));
        this.createdAt = collection.createdAt;
        this.modifiedAt = collection.modifiedAt;
    }
}
