import { Collection } from '../entity/collection.entity';

export class MovieResponseDto {
    id: number;
    name: string;
    like: number;
    movieIds: number[];
    createdAt: Date;
    modifiedAt: Date;

  constructor(collection: Collection) {
    this.id = collection.id;
    this.name = collection.name;
    this.like = collection.like;
    this.movieIds = collection.movieIds;
    this.createdAt = collection.createdAt;
    this.modifiedAt = collection.modifiedAt;
  }
}