import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Favorite } from './res/favorite/entity/favorite.entity';
import { FavoriteModule } from './res/favorite/favorite.module';
import { Movie } from './res/movie/entity/movie.entity';
import { MovieModule } from './res/movie/movie.module';
import { Review } from './res/review/entity/review.entity';
import { ReviewModule } from './res/review/review.module';
import { ReviewReply } from './res/reviewreply/entity/reviewreply.entity';
import { ReviewReplyModule } from './res/reviewreply/reviewreply.module';
import { User } from './res/user/entity/user.entity';
import { UserModule } from './res/user/user.module';

//UserModule을 생성했기 때문에 AppModule에 등록을 해야 동작하게끔 만듦
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // retryAttempts: configService.get('NODE_ENV') === 'prod' ? 10 : 1,
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        entities: [Favorite, Review, ReviewReply, Movie, User],
        synchronize: true,
        logging: true,
        timezone: 'local',
      }),
    }),
    // TypeOrmModule.forFeature([ReviewEntity]), // 특정 엔티티에 대한 레포지토리 등록
    ReviewModule,
    FavoriteModule,
    ReviewReplyModule,
    MovieModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
