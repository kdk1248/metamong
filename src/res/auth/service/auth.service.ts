import { ConflictException, Injectable, UnauthorizedException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { SignInRequestDto } from '../dto/sign-in-request.dto';
import { SignUpRequestDto } from '../dto/sign-up-request.dto';
import { User } from 'src/res/user/entity/user.entity';
import { UserRole } from 'src/res/user/enum/user-role.enum';
import { UserRepository } from 'src/res/user/repository/user.repository'; // 가정: UserRepository를 사용하여 DB 접근

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
        private httpService: HttpService
    ) {}

    // 유저 생성 공통 메서드
    signInWithKakao(kakaoAuthResCode: string): { jwtToken: any; user: any; } | PromiseLike<{ jwtToken: any; user: any; }> {
        throw new Error('Method not implemented.');
    }

    // 회원 가입
    async signUp(signUpRequestDto: SignUpRequestDto): Promise<User> {
        const { username, password, email } = signUpRequestDto;
        this.logger.verbose(`Attempting to sign up user with email: ${email}`);

        await this.checkEmailExists(email);
        const hashedPassword = await this.hashPassword(password);

        const newUser = this.createUser(username, hashedPassword, email);
        const savedUser = await this.usersRepository.save(newUser);

        this.logger.verbose(`User signed up successfully with email: ${email}`);
        return savedUser;
    }

    // 로그인
    async signIn(signInRequestDto: SignInRequestDto): Promise<{ jwtToken: string, user: User }> {
        const { email, password } = signInRequestDto;
        this.logger.verbose(`Attempting to sign in user with email: ${email}`);

        const existingUser = await this.findUserByEmail(email);
        if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
            this.logger.warn(`Failed login attempt for email: ${email}`);
            throw new UnauthorizedException('Incorrect email or password.');
        }

        const jwtToken = await this.generateJwtToken(existingUser);
        return { jwtToken, user: existingUser };
    }

    // 카카오 로그인 및 회원 가입 처리
    async signInOrSignUpWithKakao(kakaoAuthResCode: string): Promise<{ jwtToken: string, user: User }> {
        const kakaoUserInfo = await this.getKakaoUserInfo(kakaoAuthResCode);
        let user = await this.findUserByEmail(kakaoUserInfo.email);

        if (!user) {
            user = await this.signUpWithKakao(kakaoUserInfo);
        }

        const jwtToken = await this.generateJwtToken(user);
        return { jwtToken, user };
    }

    // 이메일 중복 확인 메서드
    private async checkEmailExists(email: string): Promise<void> {
        this.logger.verbose(`Checking if email exists: ${email}`);

        const existingUser = await this.findUserByEmail(email);
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }
    }

    // 이메일로 유저 찾기 메서드
    private async findUserByEmail(email: string): Promise<User | undefined> {
        return await this.usersRepository.findOne({ where: { email } });
    }

    // 유저 생성 공통 메서드
    private createUser(username: string, password: string, email: string): User {
        return this.usersRepository.create({
            username,
            password,
            email,
            role: UserRole.USER
        });
    }

    // 비밀번호 해싱 암호화 메서드
    private async hashPassword(password: string): Promise<string> {
        this.logger.verbose(`Hashing password`);

        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    // 카카오 정보로 회원 가입 처리
    private async signUpWithKakao(kakaoUserInfo: any): Promise<User> {
        const kakaoUsername = kakaoUserInfo.kakao_account.name;
        const kakaoEmail = kakaoUserInfo.kakao_account.email;

        const temporaryPassword = uuidv4(); // 임시 비밀번호 생성
        const hashedPassword = await this.hashPassword(temporaryPassword);

        const newUser = this.createUser(kakaoUsername, hashedPassword, kakaoEmail);
        return this.usersRepository.save(newUser);
    }

    // Kakao Authorization Code로 Access Token 요청
    private async getKakaoAccessToken(code: string): Promise<string> {
        const tokenUrl = 'https://kauth.kakao.com/oauth/token';
        const payload = {
            grant_type: 'authorization_code',
            client_id: process.env.KAKAO_CLIENT_ID,
            redirect_uri: process.env.KAKAO_REDIRECT_URI,
            code,
            client_secret: process.env.KAKAO_CLIENT_SECRET
        };

        const response = await firstValueFrom(this.httpService.post(tokenUrl, null, {
            params: payload,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }));

        return response.data.access_token;
    }

    // Access Token으로 Kakao 사용자 정보 요청
    private async getKakaoUserInfo(kakaoAuthResCode: string): Promise<any> {
        const accessToken = await this.getKakaoAccessToken(kakaoAuthResCode);
        const userInfoUrl = 'https://kapi.kakao.com/v2/user/me';
        const response = await firstValueFrom(this.httpService.get(userInfoUrl, {
            headers: { Authorization: `Bearer ${accessToken}` }
        }));
        return response.data;
    }

    // JWT 생성 공통 메서드
    private async generateJwtToken(user: User): Promise<string> {
        const payload = { email: user.email, userId: user.id, role: user.role };
        const expiresIn = 3600; // 1시간
        return this.jwtService.sign(payload, { expiresIn });
    }

    // 회원 탈퇴 메서드 추가
    async deleteUser(id: string): Promise<void> {
        this.logger.verbose(`Attempting to delete user with ID: ${id}`);

        const userId = parseInt(id, 10); // id를 number로 변환

        // 유효한 ID인지 체크
        if (isNaN(userId)) {
            this.logger.warn(`Invalid user ID: ${id}`);
            throw new NotFoundException('Invalid user ID');
        }

        const user = await this.usersRepository.findOne({ where: { id: userId } }); // userId로 변경
        if (!user) {
            this.logger.warn(`User not found with ID: ${userId}`);
            throw new NotFoundException('User not found');
        }

        await this.usersRepository.remove(user);
        this.logger.verbose(`User with ID: ${userId} deleted successfully`);
    }

    // 사용자 ID로 사용자 찾기
async findUserById(id: string): Promise<User> {
    const userId = parseInt(id, 10); // ID를 number로 변환
    if (isNaN(userId)) {
        throw new NotFoundException(`Invalid user ID`);
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } }); // userId 사용
    if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
}
}
