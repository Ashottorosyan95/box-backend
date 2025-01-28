import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(userDto: { username: string; email: string; password: string }) {
    const existingUser = await this.userRepository.findOne({
        where: [{ email: userDto.email }, { username: userDto.username }],
      });
    
    if (existingUser) {
        return { success: false, message: 'User with this email or username already exists' };
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    const user = this.userRepository.create({ ...userDto, password: hashedPassword });

    await this.userRepository.save(user);

    return { message: 'User registered successfully' };
  }

  async login(userDto: { email: string; username: string; password: string }) {
    const user = await this.userRepository.findOne({
      where: [{ email: userDto.email }, { username: userDto.username }],
    });
  
    if (!user || !(await bcrypt.compare(userDto.password, user.password))) {
      throw new UnauthorizedException('Invalid email/username or password');
    }
  
    const payload = { id: user.id, type: user.type };
  
    return {
        success: true,
        accessToken: this.jwtService.sign(payload),
    };
  }
  
}
