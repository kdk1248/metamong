import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { User } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { CommentModule } from '../comment/comment.module';
import { MovieModule } from '../movie/movie.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // User entity managed by TypeORM
    forwardRef(() =>CommentModule), 
    MovieModule,
    JwtModule.register({
      secret: 'your-secret-key', // Use a strong secret key
      signOptions: { expiresIn: '60m' }, // Optional configuration for token expiration
    }),
  ],
  providers: [UserService], // UserRepository should be handled by TypeORM automatically
  controllers: [UserController],
  exports: [UserService], // Exporting UserService instead of UserRepository for better encapsulation
})
export class UserModule {}
