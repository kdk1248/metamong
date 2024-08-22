import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteController } from './controller/favorite.controller';
import { Favorite } from './entity/favorite.entity';
import { FavoriteService } from './service/favorite.service';
// import { UserEntity } from '../user/user.entity';  // UserEntity를 가져옵니다.
// import { MovieEntity } from '../movie/movie.entity';  // MovieEntity를 가져옵니다.

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
