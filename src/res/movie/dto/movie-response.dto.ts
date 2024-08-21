import { MovieEntity } from '../entity/movie.entity';

export class MovieResponseDto {
  id: number;
  title: string;
  directorId: number;
  genre: string;
  contents: string;
  runningTime: number;
  posterUrl: string;
  favorite: number;
  releasedAt: Date;
  createdAt: Date;
  modifiedAt: Date;

  constructor(movie: MovieEntity) {
    this.id = movie.id;
    this.title = movie.title;
    this.directorId = movie.directorId;
    this.genre = movie.genre;
    this.contents = movie.contents;
    this.runningTime = movie.runningTime;
    this.posterUrl = movie.posterUrl;
    this.favorite = movie.favorite;
    this.releasedAt = movie.releasedAt;
    this.createdAt = movie.createdAt;
    this.modifiedAt = movie.modifiedAt;
  }
}
