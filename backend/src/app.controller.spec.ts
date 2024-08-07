import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { VideoService } from './video/video.service';
import { beforeEach, describe, it} from 'node:test';
import expect from "node:test"

describe('AppController', () => {
  let appController: AppController;
  let videoService: VideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: VideoService,
          useValue: {
            getActiveStreams: jest.fn().mockReturnValue([]),
            getStreamById: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    videoService = module.get<VideoService>(VideoService);
  });


});
