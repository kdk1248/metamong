import { Collection } from '../entity/collection.entity';

export class MovieResponseDto {
    id: number;
    name: string;
    like: number;
    directorId: number;
    movieIds: number[];
    createdAt: Date;
    modifiedAt: Date;

  constructor(collection: Collection) {
    this.id = collection.id;
    this.name = collection.name;
    this.like = collection.like;
    this.directorId = collection.directorId;
    this.movieIds = collection.movieIds;
    this.createdAt = collection.createdAt;
    this.modifiedAt = collection.modifiedAt;
  }
}