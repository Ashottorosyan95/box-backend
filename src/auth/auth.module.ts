import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1d' },
          }),
        }),
        TypeOrmModule.forFeature([User])
      ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [PassportModule],
})
export class AuthModule {}
