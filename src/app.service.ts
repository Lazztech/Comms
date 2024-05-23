
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

  mp3ReadableSteam: Readable;

  constructor() {
    this.start();
  }

  getHello(): string {
    return 'Hello World!';
  }

  start() {
    console.log(ffmpegPath)
    this.ffmpegMicOutput = this.startFfmpegMicProcess();
    this.ffmpegMicOutput.pipe(this.stream);
    this.stream.on('data', (chunk) => console.log('stream on data', chunk.length));
    this.stream.on('close', () => console.log('stream close'));
    this.stream.on('end', () => console.log('stream end'));
    this.stream.on('drain', () => console.log('stream drain'));
    this.stream.on('error', (err) => console.error('stream err', err));
    this.stream.on('finish', () => console.log('stream finish'));
    this.stream.on('pause', () => { 
      console.log('stream pause');
      // this.stream.resume();
    });
    this.stream.on('pipe', () => console.log('stream pipe'));
    // this.stream.on('readable', () => console.log('stream readable')); 
    this.stream.on('resume', () => console.log('stream resume'));
    this.stream.on('unpipe', () => console.log('stream unpipe'));

    // this.startHlsOutput();
    this.mp3ReadableSteam = this.startMp3Output();
  }

  broadcast(buffer: Buffer) {
    this.stream.push(buffer);
  }

  startMp3Output() {
    const x = spawn(ffmpegPath, [
      '-i', 'pipe:',
      '-f', 'mp3',
      '-'
    ]);
    this.stream.pipe(x.stdin);
    return x.stdout;
  }

  startHlsOutput() {
    const x = spawn(ffmpegPath, [
      '-i', 'pipe:',
      '-codec:a', 'aac',
      '-ab', '96k',
      '-f', 'hls',
      '-hls_time', '3', // Segment duration (in seconds)
      '-hls_list_size', '3', // Number of HLS segments to keep in playlist
      '-hls_flags', 'delete_segments', // Automatically delete old segments
      'public/output.m3u8' // HLS playlist file name
    ]);
    this.stream.pipe(x.stdin);
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
