import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './controller/movie.controller';
import { Movie } from './entity/movie.entity';
import { MovieService } from './service/movie.service';
import { HttpModule } from '@nestjs/axios';
import { CollectionModule } from '../collection/collection.module';
import { MovieRepository } from './repository/movie.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    HttpModule,
    forwardRef(() => CollectionModule),
  ],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository],
  exports: [MovieService, MovieRepository],
})
export class MovieModule {}
