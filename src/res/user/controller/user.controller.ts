// import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from '../service/user.service';
// import { LoginRequestDto, SignupRequestDto } from '../dto/user-request.dto';
// import { LoginResponseDto } from '../dto/user-response.dto';

// @Controller('api/user')
// export class UserController {
//     constructor(
//         private readonly userService: UserService,
//         private readonly jwtService: JwtService
//     ) {}

//     @Post('signups')
//     async signup(@Body() request: SignupRequestDto): Promise<LoginResponseDto> {
//         // Check if the user already exists
//         const existingUser = this.userService.findUserByEmail(request.email);
//         if (existingUser) {
//             throw new HttpException('Email already exists.', HttpStatus.BAD_REQUEST);
//         }

//         // Verify that passwords match
//         if (request.password !== request.confirmPassword) {
//             throw new HttpException('Passwords do not match.', HttpStatus.BAD_REQUEST);
//         }
//         return await new LoginResponseDto('Signup successful', '');
//     }

//     @Post('logins')
//     async login(@Body() request: LoginRequestDto): Promise<LoginResponseDto> {
//         // Find the user by email
//         const user = this.userService.findUserByEmail(request.email);
//         if (!user) {
//             throw new HttpException('Invalid email or password.', HttpStatus.UNAUTHORIZED);
//         }

//         // Validate the password
//         const isPasswordValid = await bcrypt.compare(request.password, (await user).password);
//         if (!isPasswordValid) {
//             throw new HttpException('Invalid email or password.', HttpStatus.UNAUTHORIZED);
//         }

//         // Generate JWT token
//         const payload = { email: (await user).email, name: (await user).name };
//         const token = this.jwtService.sign(payload);

//         return new LoginResponseDto('Login successful', token);
//     }
// }
