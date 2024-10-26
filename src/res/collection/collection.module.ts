import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/res/user/user.module';
import { MovieModule } from '../movie/movie.module';
import { CollectionController } from './controller/collection.controller';
import { Collection } from './entity/collection.entity';
import { CollectionRepository } from './repository/collection.repository';
import { CollectionService } from './service/collection.service';
import { Movie } from '../movie/entity/movie.entity';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collection, Movie, User]),
    forwardRef(() => MovieModule),
    forwardRef(() => UserModule),
  ],
  providers: [CollectionService, CollectionRepository],
  controllers: [CollectionController],
  exports: [CollectionService, CollectionRepository],
})
export class CollectionModule {}
