import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor( 
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async getProfile (req) {
        const userId = req.user.userId;
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: ['id', 'firstName', 'lastName', 'username', 'email', 'createdAt', 'type'],
        });
        return {
            success: true,
            user
        }
        
    }
}
