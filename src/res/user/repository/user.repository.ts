// user.repository.ts
import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository {
    create(arg0: { name: string; email: string; phonenumber: any; password: any; }) {
        throw new Error('Method not implemented.');
    }
    findOne(arg0: { where: { email: string; }; }) {
        throw new Error('Method not implemented.');
    }
    private users: User[] = [];

    async save(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }
}
