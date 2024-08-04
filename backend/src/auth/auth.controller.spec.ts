import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        validateUser: jest.fn(),
                        login: jest.fn(),
                    },
                },
                {
                    provide: UsersService,
                    useValue: {
                        findOneByUsername: jest.fn(),
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
    });

    describe('login', () => {
        it('should return an access token if credentials are valid', async () => {
            const user = new User();
            user.username = 'testuser';
            user.password = 'password';

            authService.validateUser = jest.fn().mockResolvedValue(user);
            authService.login = jest.fn().mockResolvedValue({ access_token: 'token' });

            const result = await authController.login(user);
            expect(result).toEqual({ access_token: { access_token: 'token' } });
        });

        it('should throw UnauthorizedException if credentials are invalid', async () => {
            const user = new User();
            user.username = 'testuser';
            user.password = 'wrongpassword';

            authService.validateUser = jest.fn().mockResolvedValue(null);

            await expect(authController.login(user)).rejects.toThrow(UnauthorizedException);
        });
    });

    describe('register', () => {
        it('should register a new user and return an access token', async () => {
            const user = { username: 'newuser', password: 'password' };
            const createdUser = new User();
            createdUser.username = 'newuser';
            createdUser.password = 'hashedpassword';

            usersService.findOneByUsername = jest.fn().mockResolvedValue(null);
            usersService.create = jest.fn().mockResolvedValue(createdUser);
            authService.login = jest.fn().mockResolvedValue({ access_token: 'token' });

            const result = await authController.register(user);
            expect(result).toEqual({ access_token: { access_token: 'token' } });
        });

        it('should throw ConflictException if username already exists', async () => {
            const user = { username: 'existinguser', password: 'password' };
            const existingUser = new User();
            existingUser.username = 'existinguser';

            usersService.findOneByUsername = jest.fn().mockResolvedValue(existingUser);

            await expect(authController.register(user)).rejects.toThrow(ConflictException);
        });
    });

    describe('getProtectedData', () => {
        it('should return protected data', async () => {
            const result = await authController.getProtectedData();
            expect(result).toEqual({ message: 'This is protected data' });
        });
    });
});
