import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoService {
  private streams: Map<string, { id: string; title: string; username: string; thumbnail: string; offer?: any }> = new Map();

  startStream(clientId: string, data: any): string {
    const streamId = clientId;
    const { title, username, thumbnail, offer } = data;
    this.streams.set(clientId, { id: streamId, title, username, thumbnail, offer });
    return streamId;
  }

  getStreamData(peerId: string): { id: string; title: string; username: string; thumbnail: string; offer?: any } | undefined {
    return this.streams.get(peerId);
  }

  stopStream(clientId: string): string | undefined {
    const streamId = this.streams.get(clientId)?.id;
    if (streamId) {
      this.streams.delete(clientId);
    }
    return streamId;
  }

  getActiveStreams(): any[] {
    return Array.from(this.streams.values());
  }

  getStreamById(id: string): any | undefined {
    return Array.from(this.streams.values()).find(stream => stream.id === id);
  }
}
