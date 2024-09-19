import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieRequestDto } from '../dto/movie-request.dto';
import { MovieResponseDto } from '../dto/movie-response.dto';
import { Movie } from '../entity/movie.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs'; // RxJS에서 lastValueFrom import 필요

@Injectable()
export class MovieService {
  private readonly KMDB_API_KEY='SX0Y99KN76LC3MS674Y2';
  private readonly BASE_URL =
    'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp';

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    // //환경 변수에서 KMDb API Key 를 가져오기
    // this.apiKey = this.configService.get<string>('KMDB_API_KEY');
  }

   // KMDb API를 통해 장르별 영화 가져오기
   async getMoviesByGenre(genre: string): Promise<any> {
    const url = `${this.BASE_URL}?ServiceKey=${this.KMDB_API_KEY}&listCount=10&genre=${genre}`;

    // HTTP GET 요청을 통해 영화 데이터 가져오기
    const response = this.httpService.get(url).pipe(
      map(response => response.data.Data[0]?.Result),
    );

    return lastValueFrom(response);
  }

  // 영화 생성
  async createMovie(
    movieRequestDto: MovieRequestDto,
  ): Promise<MovieResponseDto> {
    const movie = this.movieRepository.create(movieRequestDto);
    const savedMovie = await this.movieRepository.save(movie);
    return new MovieResponseDto(savedMovie);
  }

  // 영화 목록 조회
  async getMovies(): Promise<MovieResponseDto[]> {
    const movies = await this.movieRepository.find({
      order: {
        modifiedAt: 'DESC',
      },
    });
    return movies.map((movie) => new MovieResponseDto(movie));
  }

  async getMovieById(id: number): Promise<MovieResponseDto> {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return new MovieResponseDto(movie);
  }
  

  // 영화 업데이트
  async updateMovie(
    id: number,
    movieRequestDto: MovieRequestDto,
  ): Promise<MovieResponseDto> {
    const movie = await this.movieRepository.findOneBy({ id });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    this.movieRepository.merge(movie, movieRequestDto);
    const updatedMovie = await this.movieRepository.save(movie);
    return new MovieResponseDto(updatedMovie);
  }

  // 영화 삭제
  async deleteMovie(id: number): Promise<void> {
    const result = await this.movieRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
  }

  // 영화 검색
  async searchMovies(title: string): Promise<Movie[]> {
    console.log('Searching for movie with title:', title); // 검색하는 제목을 로그로 출력
    const movies = await this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.title LIKE :title', { title: `%${title}%` })
      .getMany();
    
    console.log('Movies found:', movies); // 검색된 결과를 로그로 출력
    return movies;
  }

}
