import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonBigPKEntity } from 'src/res/common/entity/common.entity';
import { ReviewReply } from 'src/res/reviewreply/entity/reviewreply.entity';
import { Favorite } from 'src/res/favorite/entity/favorite.entity';
import { Review } from 'src/res/review/entity/review.entity';
import { UserRole } from '../enum/user-role.enum';
import { SignupRequestDto } from '../dto/user-request.dto';

@Entity()
export class User extends CommonBigPKEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { unique: true, nullable: false })
    email: string;

    @Column('varchar', { nullable: false })
    username: string;

    @Column('varchar', { nullable: false })
    phonenumber: string;

    @Column('varchar', { nullable: false })
    password: string;

    @Column()
    role: UserRole;
  
    @Column()
    postalCode: string;

    @Column()
    address: string;

    @Column()
    detailAddress: string;
    
    @OneToMany(() => Review, (review) => review.user)
    comments: Review[];

    @OneToMany(() => Favorite, (favorite) => favorite.user)
    favorite: Favorite[];

    @OneToMany(() => ReviewReply, (reviewreply) => reviewreply.user)
    replies: ReviewReply[];
;

    constructor(signupRequestDto?: SignupRequestDto) {
        super();
        if (signupRequestDto) {
            this.username = signupRequestDto.name;
            this.email = signupRequestDto.email;
            this.phonenumber = signupRequestDto.phoneNumber;
            this.password = signupRequestDto.password;
        }
    }

    update(signupRequestDto: SignupRequestDto): void {
        this.username = signupRequestDto.name;
        this.email = signupRequestDto.email;
        this.phonenumber = signupRequestDto.phoneNumber;
        this.password = signupRequestDto.password;
    }
}
