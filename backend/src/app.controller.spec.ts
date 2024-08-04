import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { join } from 'path';
import { Response } from 'express';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('getIndex', () => {
        it('should send index.html file', () => {
            const res = {
                sendFile: jest.fn(),
            } as unknown as Response;

            appController.getIndex(res);

            expect(res.sendFile).toHaveBeenCalledWith(join(__dirname, '..', 'index.html'));
        });
    });
});
