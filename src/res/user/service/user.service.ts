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
  ) {}

  // 사용자 이름으로 조회
  async findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  // 회원정보+파일 정보 조회
  async getUserByUsernameWithProfile(username: string): Promise<User> {
    this.logger.verbose(`Retrieving User with username ${username}`);
    const foundUser = await this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.profilePictures', 'ProfilePicture')
      .where('user.username = :username', { username })
      .getOne();

    if (!foundUser) {
      this.logger.warn(`User with username ${username} not found`);
      throw new NotFoundException(`User with username ${username} not found`);
    }
    this.logger.verbose(`User retrieved successfully with username ${username}: ${JSON.stringify(foundUser)}`);
    return foundUser;
  }

  // 회원정보 수정
  async updateUser(username: string, updateUserRequestDto: UpdateUserRequestDto, logginedUser: User, file?: Express.Multer.File): Promise<User> {
    this.logger.verbose(`Attempting to update User with username ${username}`);

    const foundUser = await this.getUserByUsernameWithProfile(username);

    if (foundUser.id !== logginedUser.id) {
      this.logger.warn(`User ${logginedUser.username} attempted to update User details ${username} without permission`);
      throw new UnauthorizedException(`You do not have permission to update this User`);
    }

    const updatedUser = await this.userRepository.save(
      Object.assign(foundUser, updateUserRequestDto)
    );

    this.logger.verbose(`User with username ${username} updated successfully: ${JSON.stringify(updatedUser)}`);
    return updatedUser;
  }

  // 회원 탈퇴
  async deleteUserByUsername(username: string, logginedUser: User): Promise<void> {
    this.logger.verbose(`User ${logginedUser.username} is attempting to delete User with username ${username}`);
    const foundUser = await this.findOneByUsername(username);
    if (foundUser.id !== logginedUser.id) {
      this.logger.warn(`User ${logginedUser.username} attempted to delete User ${username} without permission`);
      throw new UnauthorizedException(`You do not have permission to delete this User`);
    }
    await this.userRepository.remove(foundUser);
    this.logger.verbose(`User with username ${username} deleted by User ${logginedUser.username}`);
  }

  // 사용자 등록
  async addUser(signupRequestDto: SignupRequestDto): Promise<User> {
    const user = this.userRepository.create(signupRequestDto);
    user.password = await bcrypt.hash(user.password, 10); // 비밀번호 해싱
    return await this.userRepository.save(user);
  }

  // 사용자 이름으로 찾기
  async findUserByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username } });
  }

  // 사용자 등록
  async signup(signupRequestDto: SignupRequestDto): Promise<string> {
    const existingUser = await this.findUserByUsername(signupRequestDto.username);

    if (existingUser) {
      throw new HttpException(
        'Username already exists.',
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
    const user = await this.findUserByUsername(loginRequestDto.username);

    if (!user) {
      throw new HttpException('Invalid username or password.', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(loginRequestDto.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid username or password.', HttpStatus.UNAUTHORIZED);
    }

    // JWT 발급 부분은 필요에 따라 추가
    const payload = { username: user.username }; 
    const token = ''; // JWT 토큰 생성 로직 필요

    return new LoginResponseDto('Login successful', token);
  }
}
