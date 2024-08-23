import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { SignupRequestDto } from '../dto/user-request.dto';

@Injectable()
export class UserRepository {
    private users: User[] = [];

    create(userData:SignupRequestDto): User {
        const newUser = new User();
        newUser.name = userData.name;
        newUser.email = userData.email;
        newUser.phonenumber = userData.phoneNumber;
        newUser.password = userData.password;
        newUser.id = this.users.length + 1; // 임시로 ID를 생성합니다.
        return newUser;
    }

    async save(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }

    async findOne(condition: { where: { email: string } }): Promise<User | undefined> {
        return this.users.find(user => user.email === condition.where.email);
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }
}
