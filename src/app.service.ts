
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import { Injectable } from '@nestjs/common';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { Readable } from 'stream';
import MemoryStream = require("memorystream");

@Injectable()
export class AppService {
  ffmpegMicProcess: ChildProcessWithoutNullStreams;
  ffmpegMicOutput: Readable;

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
      this.stream.push(chunk)
    });
  }

  broadcast(buffer: Buffer) {
    console.log(buffer);
    Readable.from(buffer);
    this.stream.push(buffer);
  }

  startFfmpegMicProcess() {
    // ffmpeg -use_wallclock_as_timestamps true -f wav -re -i pipe: -codec:a aac -b:a 128k -af aresample=async=1 -f wav -
    // ffmpeg -use_wallclock_as_timestamps true -f avfoundation -i :1 -f wav -re -i pipe: -codec:a aac -b:a 128k -af aresample=async=1 -filter_complex amerge=inputs=2 -f wav -
    this.ffmpegMicProcess = spawn(ffmpegPath, [
      '-f', 'avfoundation', // mac os media devices
      '-i', ':1', // mac os microphone input
      '-f', 'wav',
      '-'
    ]);
    return this.ffmpegMicProcess.stdout;
  }
}
