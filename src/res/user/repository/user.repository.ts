import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { SignupRequestDto } from '../dto/user-request.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(userData: SignupRequestDto): Promise<User> {
        const newUser = this.userRepository.create(); // TypeORM creates a new instance of User
        newUser.username = userData.username;
        newUser.email = userData.email;
        newUser.password = userData.password;
        return await this.userRepository.save(newUser); // Save the new user in the database
    }

    async save(user: User): Promise<User> {
        return await this.userRepository.save(user); // Save the user in the database
    }

    async findOne(condition: { where: { email: string } }): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { email: condition.where.email } });
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }
    async findUserWithLikedMoviesByEmail(email: string): Promise<User | undefined> {
        console.log(`Finding user with email: ${email}`);
        const userWithFavorites = await this.userRepository
          .createQueryBuilder('user')
          .leftJoinAndSelect('user.favorite', 'favorite')
          .leftJoinAndSelect('favorite.movie', 'movie')
          .where('user.email = :email', { email })
          .getOne();
        console.log(`Result: ${JSON.stringify(userWithFavorites)}`);
        return userWithFavorites;
      }
      
}
