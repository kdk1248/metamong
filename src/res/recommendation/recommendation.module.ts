import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // KMDb API를 위한 HttpModule
import { RecommendationService } from './service/recommendation.service';
import { RecommendationController } from './controller/recommendation.controller';
import { FavoriteModule } from '../favorite/favorite.module';
import { MovieModule } from '../movie/movie.module';

@Module({
  imports: [FavoriteModule, MovieModule, HttpModule,], 
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommendationModule {}