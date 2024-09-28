import { Movie } from '../entity/movie.entity';

export class MovieResponseDto {
  id: number;
  title: string;
  directorName: string;
  genre: string;
  contents: string;
  runningTime: number;
  posterUrl: string;
  stillUrl: string;
  favorite: number;

  // KMDb
  nation: string;
  company: string;
  ratedYn: boolean;
  type: string;
  actor: string;

  releasedAt: Date;
  createdAt: Date;
  modifiedAt: Date;

  constructor(movie: Movie) {
    this.id = movie.id;
    this.title = movie.title;
    this.directorName = movie.directorName;
    this.genre = movie.genre;
    this.contents = movie.contents;
    this.runningTime = movie.runningTime;
    this.posterUrl = movie.posterUrl;
    this.stillUrl = movie.stillUrl;
    this.favorite = movie.favorite;
    this.nation = movie.nation;
    this.company = movie.company;
    this.ratedYn = movie.ratedYn;
    this.type = movie.type;
    this.actor = movie.actor;
    this.releasedAt = movie.releasedAt;
    this.createdAt = movie.createdAt;
    this.modifiedAt = movie.modifiedAt;
  }
}
