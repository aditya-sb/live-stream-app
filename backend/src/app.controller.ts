import { Controller, Get, Param } from '@nestjs/common';
import { VideoService } from './video/video.service';

@Controller('streams')
export class AppController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/')
  root() {
    return { message: 'Welcome to the NestJS Application!' };
  }
  
  @Get()
  getActiveStreams(): any[] {
    return this.videoService.getActiveStreams();
  }

  @Get(':id')
  getStream(@Param('id') id: string): any | undefined {
    return this.videoService.getStreamById(id);
  }
}
