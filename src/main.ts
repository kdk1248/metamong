import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // NestExpressApplication으로 타입 캐스팅
  
  app.enableCors({
    origin: ['http://localhost:8100', 'http://localhost:4200'],
    credentials: true,
  });
  
  // 정적 파일 경로 설정
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(process.env.SERVER_PORT);
  Logger.log(`Application Running on Port : ${process.env.SERVER_PORT}`);
}
bootstrap();
