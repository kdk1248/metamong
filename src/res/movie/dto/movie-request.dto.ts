import { IsEnum } from "class-validator";
import { Genre } from "src/res/genre/genre.enum";

export class MovieRequestDto {
  directorId: number;
  title: string;
  @IsEnum(Genre)
  genre: Genre;
  contents: string;
  posterUrl: string;
  runningTime: number;
  favorite: number;

  // KMDb
  nation: string;
  company: string;
  ratedYn: boolean; // 심의여부
  type: string; // 극영, 애니, 다큐, ...
  actor: string;
}
