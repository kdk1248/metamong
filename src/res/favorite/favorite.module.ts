import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Favorite } from "./entity/favorite.entity";
import { User } from "../user/entity/user.entity";
import { Movie } from "../movie/entity/movie.entity";
import { FavoriteController } from "./controller/favorite.controller";
import { FavoriteService } from "./service/favorite.service";
import { FavoriteRepository } from "./repository/favorite.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite, User, Movie]), 
    // 이 모듈에서 Favorite, User, Movie 엔티티를 사용하여 데이터베이스 작업을 수행하기 위해 TypeOrmModule을 가져옴
  ],
  controllers: [FavoriteController], 
  // FavoriteController는 HTTP 요청을 처리하고 FavoriteService를 사용하여 로직을 수행
  providers: [
    FavoriteService, 
    FavoriteRepository,
    // FavoriteService는 비즈니스 로직을 처리하고 FavoriteRepository는 데이터베이스 작업을 처리
  ],
  exports: [FavoriteService], 
  // FavoriteService를 다른 모듈에서 사용할 수 있게 내보냄
})
export class FavoriteModule {}
