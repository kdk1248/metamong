import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteController } from './controller/favorite.controller';
import { Favorite } from './entity/favorite.entity';
import { FavoriteService } from './service/favorite.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
