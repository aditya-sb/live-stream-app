import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findOneByUsername(username: string): Promise<User | undefined> {
        this.logger.log(`Finding user by username: ${username}`);
        return this.usersRepository.findOneBy({ username });
    }

    async create(username: string, password: string): Promise<User> {
        this.logger.log(`Creating user: ${username}`);
        const user = new User();
        user.username = username;
        user.password = password;
        return this.usersRepository.save(user);
    }
}
