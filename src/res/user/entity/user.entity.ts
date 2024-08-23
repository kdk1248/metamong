import { Column, Entity } from 'typeorm';
import { CommonBigPKEntity } from './common/common.entity';
import { SignupRequestDto } from '../dto/signup-request.dto';

@Entity()
export class User extends CommonBigPKEntity {
    @Column('text', { unique: true, nullable: false })
    email: string;

    @Column('text', { nullable: false })
    name: string;

    @Column('text', { nullable: false })
    phonenumber: string;

    @Column('text', { nullable: false })
    password: string;
    comments: any;
    favorite: any;
    replies: any;

    constructor(signupRequestDto?: SignupRequestDto) {
        super();
        if (signupRequestDto) {
            this.name = signupRequestDto.name;
            this.email = signupRequestDto.email;
            this.phonenumber = signupRequestDto.phoneNumber;
            this.password = signupRequestDto.password;
        }
    }

    update(signupRequestDto: SignupRequestDto): void {
        this.name = signupRequestDto.name;
        this.email = signupRequestDto.email;
        this.phonenumber = signupRequestDto.phoneNumber;
        this.password = signupRequestDto.password;
    }
}
