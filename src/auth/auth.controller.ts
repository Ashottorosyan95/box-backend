import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() userDto: { username: string; email: string; password: string }) {
        return this.authService.register(userDto);
    }

    @Post('login')
    async login(@Body() userDto: { email: string; username: string; password: string }) {
        return this.authService.login(userDto);
    }
}
