import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewModule } from './res/review/review.module';
import { ReviewEntity } from './res/review/entity/review.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

//UserModule을 생성했기 때문에 AppModule에 등록을 해야 동작하게끔 만듦
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        retryAttempts: configService.get('NODE_ENV') === 'prod' ? 10 : 1,
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        entities: [
          path.join(__dirname, 'src/entities/**/*.entity.{js, ts}'),
        ],
        synchronize: false,
        logging: true,
        timezone: 'local',
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', // 사용하려는 데이터베이스 타입
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1248',
      database: 'movie',
      entities: [ReviewEntity], // 엔티티 목록
      synchronize: false, // 개발 환경에서만 사용, 자동으로 데이터베이스 스키마를 동기화합니다.
    }),
    TypeOrmModule.forFeature([ReviewEntity]), // 특정 엔티티에 대한 레포지토리 등록
    ReviewModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
