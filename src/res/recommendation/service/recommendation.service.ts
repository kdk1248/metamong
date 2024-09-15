import { Injectable } from '@nestjs/common';
import { FavoriteService } from 'src/res/favorite/service/favorite.service';
import { MovieService } from 'src/res/movie/service/movie.service';


@Injectable()
export class RecommendationService {
  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly movieService: MovieService,
  ) {}

  // 관심 목록에서 영화 장르 카운트
  countGenres(movies: any[]): { [key: string]: number } {
    const genreCount = {};
    movies.forEach(movie => {
      const genre = movie.genre;
      if (genre in genreCount) {
        genreCount[genre] += 1;
      } else {
        genreCount[genre] = 1;
      }
    });
    return genreCount;
  }

  // 특정 장르가 많이 저장된 경우 해당 장르의 영화를 KMDb API에서 추천
  async recommendMovies(userId: string) {
    // 관심 목록에서 사용자가 저장한 영화 가져오기
    const favoriteMovies = await this.favoriteService.getUserFavoriteMovies(userId);

    // 장르 카운트 계산
    const genreCount = this.countGenres(favoriteMovies);

    // 가장 많이 저장된 장르 찾기
    const popularGenre = Object.keys(genreCount).reduce((a, b) =>
      genreCount[a] > genreCount[b] ? a : b,
    );

    // MovieService를 사용해 KMDb API에서 해당 장르의 영화 추천
    const recommendedMovies = await this.movieService.getMoviesByGenre(popularGenre);

    return recommendedMovies; // KMDb API에서 가져온 영화 목록 반환
  }
}
