import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { SignupRequestDto } from '../dto/user-request.dto';
import { LoginRequestDto } from '../dto/user-request.dto';

const users = [];

@Controller('api')
export class UserController {
    constructor(private readonly jwtService: JwtService) {}

    @Post('signup')
    async signup(@Body() request: SignupRequestDto): Promise<string> {
        const existingUser = users.find(user => user.email === request.email);
        if (existingUser) {
            throw new HttpException('Email already exists.', HttpStatus.BAD_REQUEST);
        }

        if (request.password !== request.confirmPassword) {
            throw new HttpException('Passwords do not match.', HttpStatus.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(request.password, 10);

        const newUser = {
            name: request.username,
            email: request.email,
            phoneNumber: request.phoneNumber,
            password: hashedPassword,
        };
        users.push(newUser);

        return 'Signup successful';
    }

    @Post('login')
    async login(@Body() request: LoginRequestDto): Promise<string> {
        const user = users.find(user => user.email === request.email);
        if (!user) {
            throw new HttpException('Invalid email or password.', HttpStatus.UNAUTHORIZED);
        }

        const isPasswordValid = await bcrypt.compare(request.password, user.password);
        if (!isPasswordValid) {
            throw new HttpException('Invalid email or password.', HttpStatus.UNAUTHORIZED);
        }

        const payload = { email: user.email, name: user.name };
        const token = this.jwtService.sign(payload);

        return `Login successful. Token: ${token}`;
    }
}
