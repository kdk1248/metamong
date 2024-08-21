import { Repository, LessThan, Between, FindOptionsOrder } from 'typeorm';
import { MovieEntity } from '../entity/movie.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieRepository extends Repository<MovieEntity> {
    async findAllOrderByModifiedAtDesc(): Promise<MovieEntity[]> {
        return this.find({
            order: {
                modifiedAt: 'DESC',
            },
        });
    }

    async findMoviesReleasedBefore(date: Date): Promise<MovieEntity[]> {
        return this.find({
            where: {
                releasedAt: LessThan(date),
            },
        });
    }

    async findMoviesReleasedBetween(startDate: Date, endDate: Date): Promise<MovieEntity[]> {
        return this.find({
            where: {
                releasedAt: Between(startDate, endDate),
            },
        });
    }
}
