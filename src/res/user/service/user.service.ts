import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginRequestDto, SignupRequestDto } from '../dto/user-request.dto';
import { LoginResponseDto } from '../dto/user-response.dto';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UpdateUserRequestDto } from '../dto/update-user-request.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  // 사용자 이메일로 조회
  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  // 회원정보+파일 정보 조회
  async getUserByEmailWithProfile(email: string): Promise<User> {
    this.logger.verbose(`Retrieving User with email ${email}`);
    const foundUser = await this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.profilePictures', 'ProfilePicture')
      .where('user.email = :email', { email })
      .getOne();

    if (!foundUser) {
      this.logger.warn(`User with email ${email} not found`);
      throw new NotFoundException(`User with email ${email} not found`);
    }
    this.logger.verbose(`User retrieved successfully with email ${email}: ${JSON.stringify(foundUser)}`);
    return foundUser;
  }

  // 회원정보 수정
  async updateUser(email: string, updateUserRequestDto: UpdateUserRequestDto, logginedUser: User, file?: Express.Multer.File): Promise<User> {
    this.logger.verbose(`Attempting to update User with email ${email}`);

    const foundUser = await this.getUserByEmailWithProfile(email);

    if (foundUser.id !== logginedUser.id) {
      this.logger.warn(`User ${logginedUser.email} attempted to update User details ${email} without permission`);
      throw new UnauthorizedException(`You do not have permission to update this User`);
    }

    const updatedUser = await this.userRepository.save(
      Object.assign(foundUser, updateUserRequestDto)
    );

    this.logger.verbose(`User with email ${email} updated successfully: ${JSON.stringify(updatedUser)}`);
    return updatedUser;
  }

  // 회원 탈퇴
  async deleteUserByEmail(email: string, logginedUser: User): Promise<void> {
    this.logger.verbose(`User ${logginedUser.email} is attempting to delete User with email ${email}`);
    const foundUser = await this.findOneByEmail(email);
    if (foundUser.id !== logginedUser.id) {
      this.logger.warn(`User ${logginedUser.email} attempted to delete User ${email} without permission`);
      throw new UnauthorizedException(`You do not have permission to delete this User`);
    }
    await this.userRepository.remove(foundUser);
    this.logger.verbose(`User with email ${email} deleted by User ${logginedUser.email}`);
  }

  // 사용자 등록
  async addUser(signupRequestDto: SignupRequestDto): Promise<User> {
    const user = this.userRepository.create(signupRequestDto);
    user.password = await bcrypt.hash(user.password, 10); // 비밀번호 해싱
    return await this.userRepository.save(user);
  }

  // 사용자 이메일로 회원정보+좋아요영화들 찾기
  async findUserWithLikedMoviesByEmail(email: string): Promise<User | undefined> {
    const userWithFavorites = await this.userRepository
      .createQueryBuilder('user')  // user 테이블을 기준으로 쿼리 빌드 시작
      .leftJoinAndSelect('user.favorite', 'favorite')  // user와 favorite 간의 관계를 left join
      .leftJoinAndSelect('favorite.movie', 'movie')    // favorite과 movie 간의 관계를 left join
      .where('user.email = :email', { email })         // 이메일로 사용자 필터링
      .getOne();                                       // 사용자 정보 한 명만 가져옴
  
    return userWithFavorites;
  }
  

  // 사용자 이메일로 찾기
  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // 사용자 등록
  async signup(signupRequestDto: SignupRequestDto): Promise<string> {
    const existingUser = await this.findUserByEmail(signupRequestDto.email);

    if (existingUser) {
      throw new HttpException(
        'Email already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (signupRequestDto.password !== signupRequestDto.confirmPassword) {
      throw new HttpException(
        'Passwords do not match.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.addUser(signupRequestDto);
    return 'Signup successful';
  }

  // 사용자 로그인
  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.findUserByEmail(loginRequestDto.email);

    if (!user) {
      throw new HttpException('Invalid email or password.', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(loginRequestDto.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid email or password.', HttpStatus.UNAUTHORIZED);
    }

    // JWT 발급 부분은 필요에 따라 추가
    const payload = { email: user.email };
    const token = ''; // JWT 토큰 생성 로직 필요

    return new LoginResponseDto('Login successful', token);
  }
}
