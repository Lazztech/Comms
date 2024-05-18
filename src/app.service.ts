
import { Injectable } from '@nestjs/common';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';

@Injectable()
export class AppService {
  ffmpegProcess: ChildProcessWithoutNullStreams;

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
    this.ffmpegProcess = spawn(ffmpegPath, [
      '-f', 'avfoundation',
      '-i', ':1',
      '-f', 'wav',
      '-i', 'pipe:',
      '-codec:a', 'aac',
      '-b:a', '128k',
      // '-ab', '32k',
      '-f', 'hls',
      '-hls_time', '4', // Segment duration (in seconds)
      '-hls_list_size', '3', // Number of HLS segments to keep in playlist
      '-hls_flags', 'delete_segments', // Automatically delete old segments
      '-filter_complex', 'amerge=inputs=2',
      'public/output.m3u8' // HLS playlist file name
    ]);
    this.ffmpegProcess.stdout.on('data', function (chunk) {
      const textChunk = chunk.toString('utf8');
      console.log(textChunk);
    });

    this.ffmpegProcess.stderr.on('data', function (chunk) {
      const textChunk = chunk.toString('utf8');
      console.error(textChunk);
    });
  }

  broadcast() {
    this.ffmpegProcess.stdout
  }
}
