import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './controller/movie.controller';
import { Movie } from './entity/movie.entity';
import { MovieService } from './service/movie.service';
import { HttpModule } from '@nestjs/axios';
import { CollectionModule } from '../collection/collection.module'; // CollectionModule import

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    HttpModule,
    forwardRef(() => CollectionModule), 
  ],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService], 
})
export class MovieModule {}
