import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enum/user-role.enum";



@Entity()
export class User extends BaseEntity {
    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ unique: true }) // 이메일은 중복되지 않도록 한다.
    email: string;

    @Column({ default: UserRole.USER })
    role: UserRole;

    @Column({ nullable: true })
    postalCode: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    detailAddress: string;
    id: any;
    favorite: any;
    comments: any;
    replies: any;
}