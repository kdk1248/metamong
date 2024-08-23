// signup-request.dto.ts
export class SignupRequestDto {
    name: string;
    email: string;
    number: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    static email: string;
    existingUser:string;

}


