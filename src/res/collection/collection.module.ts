import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionService } from './service/collection.service';
import { CollectionController } from './controller/collection.controller';
import { Collection } from './entity/collection.entity';
import { MovieModule } from '../movie/movie.module'; 
import { UserModule } from 'src/res/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collection]),
    forwardRef(() => MovieModule),
    forwardRef(() => UserModule),
  ],
  providers: [CollectionService],
  controllers: [CollectionController],
  exports: [CollectionService],
})
export class CollectionModule {}
