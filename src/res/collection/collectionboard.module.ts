import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionBoard } from './entity/collectionboard.entity';
import { CollectionBoardController } from './controller/collectionboard.controller';
import { CollectionBoardService } from './service/collectionboard.service';
import { CollectionModule } from '../collection/collection.module'; // CollectionModule이 필요하다면 import 해주세요.

@Module({
  imports: [
    TypeOrmModule.forFeature([CollectionBoard]),
    CollectionModule, 
  ],
  controllers: [CollectionBoardController],
  providers: [CollectionBoardService],
  exports: [CollectionBoardService],
})
export class CollectionBoardModule {}