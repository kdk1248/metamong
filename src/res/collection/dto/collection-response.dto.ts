import { Collection } from '../entity/collection.entity';

export class MovieResponseDto {
    id: number;
    name: string;
    like: number;
    directorId: number;
    movieId: number;
    createdAt: Date;
    modifiedAt: Date;

  constructor(collection: Collection) {
    this.id = collection.id;
    this.name = collection.name;
    this.like = collection.like;
    this.directorId = collection.directorId;
    this.movieId = collection.movieId;
    this.createdAt = collection.createdAt;
    this.modifiedAt = collection.modifiedAt;
  }
}
