import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonBigPKEntity } from 'src/res/common/entity/common.entity';
import { Favorite } from 'src/res/favorite/entity/favorite.entity';
import { Comment } from 'src/res/comment/entity/comment.entity';
import { UserRole } from '../enum/user-role.enum';
import { SignupRequestDto } from '../dto/user-request.dto';
import { CommentReply } from 'src/res/commentreply/entity/commentreply.entity';
import { Collection } from 'src/res/collection/entity/collection.entity';

@Entity()
export class User extends CommonBigPKEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { unique: true, nullable: false })
    email: string;

    @Column('varchar', { nullable: false })
    username: string;

    @Column('varchar', { nullable: false })
    password: string;

    @Column()
    role: UserRole;
    
    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @OneToMany(() => Favorite, (favorite) => favorite.user)
    favorite: Favorite[];

    @OneToMany(() => CommentReply, (commentreply) => commentreply.user)
    replies: CommentReply[];

    @ManyToMany(() => Collection, (collection) => collection.users)
    @JoinTable()
    collections: Collection[];
;

    constructor(signupRequestDto?: SignupRequestDto) {
        super();
        if (signupRequestDto) {
            this.username = signupRequestDto.name;
            this.email = signupRequestDto.email;
            this.password = signupRequestDto.password;
        }
    }

    update(signupRequestDto: SignupRequestDto): void {
        this.username = signupRequestDto.name;
        this.email = signupRequestDto.email;
        this.password = signupRequestDto.password;
    }
}
