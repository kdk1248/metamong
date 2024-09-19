import { IsEmail, IsEnum, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";
import { UserRole } from "src/res/user/enum/user-role.enum";


export class SignUpRequestDto {
    @IsNotEmpty() // null 값 체크
    @MinLength(2) // 최소 문자 수
    @MaxLength(20) // 최대 문자 수
    // @IsAlphanumeric() // 영문 알파벳만 허용일 경우
    @Matches(/^[가-힣]+$/, { message: 'Username must be in Korean characters', }) // 한글 이름인 경우
    username: string;

    @IsNotEmpty()
    @MaxLength(20)
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Password too weak', }) // 대문자, 소문자, 숫자, 특수문자 포함
    password: string;

    @IsNotEmpty()
    phonenumber: string;

    @IsNotEmpty()
    @IsEmail() // 이메일 형식
    @MaxLength(100)
    email: string;

    @IsNotEmpty()
    @IsEnum(UserRole) // 열거형 UserRole에 포함된 상태만 허용, USER / ADMIN
    role: UserRole;

    @IsNotEmpty()
    @Matches(/^\d{5}$/, { message: 'Postal code must be 5 digits' }) // 우편번호는 5자리 숫자
    postalCode: string;

    @IsNotEmpty()
    @MaxLength(100) // 주소는 최대 100자
    address: string;

    @MaxLength(100, { message: 'Detail address is too long' }) // 상세 주소는 선택적으로 최대 100자
    detailAddress: string;
}