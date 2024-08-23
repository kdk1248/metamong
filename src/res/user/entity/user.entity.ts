import { Column, Entity, OneToMany } from 'typeorm';
import { CommonBigPKEntity } from './common/common.entity';
import { SignupRequestDto } from '../dto/user-request.dto';
import { ReviewReply } from 'src/res/reviewreply/entity/reviewreply.entity';
import { Favorite } from 'src/res/favorite/entity/favorite.entity';

@Entity()
export class User extends CommonBigPKEntity {
    @Column('varchar', { unique: true, nullable: false })
    email: string;

    @Column('varchar', { nullable: false })
    name: string;

    @Column('varchar', { nullable: false })
    phonenumber: string;

    @Column('varchar', { nullable: false })
    password: string;
    
    @Column('text', { nullable: false })

    @OneToMany(() => ReviewReply, (reviewreply) => reviewreply.user)
    comments: ReviewReply[];

    @OneToMany(() => Favorite, (favorite) => favorite.user)
    favorite: Favorite[];

    @OneToMany(() => ReviewReply, (reviewreply) => reviewreply.user)
    replies: ReviewReply[];username: string;
;

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
