import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoGateway } from './video.gateway';

@Module({
  providers: [VideoService, VideoGateway],
  exports: [VideoService,VideoGateway],
})
export class VideoModule {}
