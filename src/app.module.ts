import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './res/collection/entity/collection.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './global.module';
import { AuthModule } from './res/auth/auth.module';
import { CommentModule } from './res/comment/comment.module';
import { Comment } from './res/comment/entity/comment.entity';
import { CommentReplyModule } from './res/commentreply/commentreply.module';
import { CommentReply } from './res/commentreply/entity/commentreply.entity';
import { Favorite } from './res/favorite/entity/favorite.entity';
import { FavoriteModule } from './res/favorite/favorite.module';
import { Movie } from './res/movie/entity/movie.entity';
import { MovieModule } from './res/movie/movie.module';
import { User } from './res/user/entity/user.entity';
import { UserModule } from './res/user/user.module';
import { CollectionModule } from './res/collection/collection.module';
import { ChatGateway } from './res/chat/chat.gateway';


@Module({
  imports: [
    ConfigModule.forRoot({
      
      isGlobal: true, //환경 변수를 전역으로 설정
      envFilePath: '.env',

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
        entities: [Favorite, Comment, CommentReply, Movie, User, Collection],
        synchronize: true,
        logging: true,
        timezone: 'local',
      }),
    }),
    GlobalModule,
    CommentModule,
    FavoriteModule,
    CommentReplyModule,
    MovieModule,
    UserModule,
    AuthModule,
    CollectionModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}

