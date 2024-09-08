import { User } from "src/res/user/entity/user.entity";
import { UserRole } from "src/res/user/enum/user-role.enum";


export class UserResponseDto {
    id: number;
    username: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    postalCode: string;
    address: string;
    detailAddress: string;

    constructor(user: User){
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.role = user.role;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.postalCode = user.postalCode;
        this.address = user.address;
        this.detailAddress = user.detailAddress;
    }
}