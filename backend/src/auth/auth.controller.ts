import { Controller, Post, Body, Get, UseGuards, UnauthorizedException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    @Post('login')
    async login(@Body() user: User): Promise<{ access_token: { access_token: string } }> {
        const validUser = await this.authService.validateUser(user.username, user.password);
        if (validUser) {
            const token = await this.authService.login(validUser);
            return { access_token: token };
        } else {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    @Post('register')
    async register(@Body() user: { username: string; password: string }): Promise<{ access_token: { access_token: string } }> {
        const existingUser = await this.usersService.findOneByUsername(user.username);
        if (existingUser) {
            throw new ConflictException('Username already exists');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await this.usersService.create(user.username, hashedPassword);
        const token = await this.authService.login(newUser);
        return { access_token: token };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('protected-endpoint')
    async getProtectedData(): Promise<{ message: string }> {
        return { message: 'This is protected data' };
    }
}
