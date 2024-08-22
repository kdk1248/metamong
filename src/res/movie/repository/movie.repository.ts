import { Repository, LessThan, Between } from 'typeorm';
import { MovieEntity } from '../entity/movie.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieRepository {
    constructor(
        @InjectRepository(MovieEntity)
        private readonly movieRepository: Repository<MovieEntity>,
    ){}

    async findAllOrderByModifiedAtDesc(): Promise<MovieEntity[]> {
        return this.movieRepository.find({
            order: {
                modifiedAt: 'DESC',
            },
        });
    }

    async findMoviesReleasedBefore(date: Date): Promise<MovieEntity[]> {
        return this.movieRepository.find({
            where: {
                releasedAt: LessThan(date),
            },
        });
    }

    async findMoviesReleasedBetween(startDate: Date, endDate: Date): Promise<MovieEntity[]> {
        return this.movieRepository.find({
            where: {
                releasedAt: Between(startDate, endDate),
            },
        });
    }
}
