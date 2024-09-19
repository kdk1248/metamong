import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonBigPKEntity } from 'src/res/common/entity/common.entity';
import { Favorite } from 'src/res/favorite/entity/favorite.entity';
import { Comment } from 'src/res/comment/entity/comment.entity';
import { UserRole } from '../enum/user-role.enum';
import { SignupRequestDto } from '../dto/user-request.dto';
import { CommentReply } from 'src/res/commentreply/entity/commentreply.entity';

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
    
    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @OneToMany(() => Favorite, (favorite) => favorite.user)
    favorite: Favorite[];

    @OneToMany(() => CommentReply, (commentreply) => commentreply.user)
    replies: CommentReply[];
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
