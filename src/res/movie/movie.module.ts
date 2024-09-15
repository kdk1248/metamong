import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './controller/movie.controller';
import { Movie } from './entity/movie.entity';
import { MovieService } from './service/movie.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]),HttpModule], // HttpModule 추가
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
