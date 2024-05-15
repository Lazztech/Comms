
import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

@Injectable()
export class AppService {
  
  constructor() {
    this.start();
  }
  getHello(): string {
    return 'Hello World!';
  }

  start() {
    console.log(ffmpegPath)
    const command = 'ffmpeg -f avfoundation -i ":1" -acodec libmp3lame -ab 32k -ac 1 -f rtp rtp://0.0.0.0:12345';
    const command2 = 'ffmpeg -f avfoundation -i ":1" -acodec aac -ab 32k -f hls -hls_time 10 -hls_list_size 6 -hls_flags delete_segments output.m3u8';
    const child = spawn(ffmpegPath, [
      '-f', 'avfoundation',
      '-i', ':1',
      '-acodec', 'aac',
      '-ab', '32k',
      '-f', 'hls',
      '-hls_time', '2', // Segment duration (in seconds)
      '-hls_list_size', '1', // Number of HLS segments to keep in playlist
      '-hls_flags', 'delete_segments', // Automatically delete old segments
      'public/output.m3u8' // HLS playlist file name
    ]);
    child.stdout.on('data', function (chunk) {
      const textChunk = chunk.toString('utf8');
      console.log(textChunk);
    });

    child.stderr.on('data', function (chunk) {
      const textChunk = chunk.toString('utf8');
      console.error(textChunk);
    });
  }
}
