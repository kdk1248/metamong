import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, Repository } from 'typeorm';
import { Movie } from '../entity/movie.entity';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAllOrderByModifiedAtDesc(): Promise<Movie[]> {
    return this.movieRepository.find({
      order: {
        modifiedAt: 'DESC',
      },
    });
  }

  async findMoviesReleasedBefore(date: Date): Promise<Movie[]> {
    return this.movieRepository.find({
      where: {
        releasedAt: LessThan(date),
      },
    });
  }

  async findMoviesReleasedBetween(
    startDate: Date,
    endDate: Date,
  ): Promise<Movie[]> {
    return this.movieRepository.find({
      where: {
        releasedAt: Between(startDate, endDate),
      },
    });
  }
}
