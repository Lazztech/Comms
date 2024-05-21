
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import { Injectable } from '@nestjs/common';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { Readable } from 'stream';
import MemoryStream = require("memorystream");

@Injectable()
export class AppService {
  ffmpegMicProcess: ChildProcessWithoutNullStreams;
  ffmpegMicOutput: Readable;

  broadcastQueue: Array<Buffer> = [];
  stream: MemoryStream = new MemoryStream();

  constructor() {
    this.start();
  }

  getHello(): string {
    return 'Hello World!';
  }

  start() {
    console.log(ffmpegPath)
    this.ffmpegMicOutput = this.startFfmpegMicProcess();
    this.ffmpegMicOutput.on('data', (chunk) => {
      this.stream.push(chunk);
    });
    this.stream.on('data', (chunk) => console.log('stream on data', chunk.length));
    this.stream.on('close', () => console.log('stream close'));
    this.stream.on('end', () => console.log('stream end'));
    this.stream.on('drain', () => console.log('stream drain'));
    this.stream.on('error', (err) => console.error('stream err', err));
    this.stream.on('finish', () => console.log('stream finish'));
    this.stream.on('pause', () => console.log('stream pause'));
    this.stream.on('pipe', () => console.log('stream pipe'));
    // this.stream.on('readable', () => console.log('stream readable')); 
    this.stream.on('resume', () => console.log('stream resume'));
    this.stream.on('unpipe', () => console.log('stream unpipe'));
  }

  broadcast(buffer: Buffer) {
    this.stream.push(buffer);
  }

  startFfmpegMicProcess() {
    // ffmpeg -use_wallclock_as_timestamps true -f wav -re -i pipe: -codec:a aac -b:a 128k -af aresample=async=1 -f wav -
    // ffmpeg -use_wallclock_as_timestamps true -f avfoundation -i :1 -f wav -re -i pipe: -codec:a aac -b:a 128k -af aresample=async=1 -filter_complex amerge=inputs=2 -f wav -
    this.ffmpegMicProcess = spawn(ffmpegPath, [
      '-hide_banner',
      '-f', 'avfoundation', // mac os media devices
      '-i', ':1', // mac os microphone input
      '-f', 'wav',
      '-'
    ]);
    return this.ffmpegMicProcess.stdout;
  }
}
