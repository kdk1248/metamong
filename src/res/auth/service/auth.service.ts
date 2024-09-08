import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../../user/service/user.service';



@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  // 회원가입 로직
  async signUp(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  // 로그인 로직
  async validateUser(username: string, pass: string): Promise<string> {
    const user = this.userService.findOne(username);
  
    if (!user) {
      console.log('User not found');
      return null;
    }
  
    const isMatch = await bcrypt.compare(pass, user.password);
    console.log('Password match:', isMatch);
  
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
  
    return null;
  }
  
  
  
  // JWT 발급
  async login(user: string) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
