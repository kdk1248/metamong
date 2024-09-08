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
import { AuthModule } from './res/auth/auth.module';
import { GlobalModule } from './global.module';
import { typeOrmConfig } from './res/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
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
    GlobalModule,
    ReviewModule,
    FavoriteModule,
    ReviewReplyModule,
    MovieModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

