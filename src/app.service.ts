
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import { Injectable } from '@nestjs/common';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { Readable } from 'stream';
import MemoryStream = require("memorystream");
import * as mic from 'mic';

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
    // this.ffmpegMicOutput.pipe(this.stream);
    this.startMicStream().pipe(this.stream);

    // this.startHlsOutput();
    this.mp3ReadableSteam = this.startMp3Output();

    this.logStreamEvents('stream: ', this.stream);
    this.logStreamEvents('ffmpegMicOutput: ', this.ffmpegMicOutput);
    this.logStreamEvents('mp3ReadableSteam', this.mp3ReadableSteam);
  }

  broadcast(buffer: Buffer) {
    Readable.from(buffer).pipe(this.stream);
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
    this.ffmpegMicProcess = spawn(ffmpegPath, [
      '-hide_banner',
      '-f', 'avfoundation', // mac os media devices
      '-i', ':0', // mac os microphone input
      '-f', 'wav',
      '-'
    ]);
    return this.ffmpegMicProcess.stdout;
  }

  startMicStream(): Readable {
    const micInstance = mic({
      rate: '9600',
      channels: '1',
      debug: true,
      fileType: 'wav'
      // exitOnSilence: 6
    });
    const micInputStream = micInstance.getAudioStream();
    console.log(micInputStream);

    micInputStream.on('data', (data) => console.log("Recieved Input Stream: " + data.length));
    micInputStream.on('error', (err) => console.log("Error in Input Stream: " + err));
    micInputStream.on('startComplete', () => console.log("Got SIGNAL startComplete"));
    micInputStream.on('stopComplete', () => console.log("Got SIGNAL stopComplete"));
    micInputStream.on('pauseComplete', () => console.log("Got SIGNAL pauseComplete"));
    micInputStream.on('resumeComplete', () => console.log("Got SIGNAL resumeComplete"));
    micInputStream.on('silence', () => console.log("Got SIGNAL silence"));
    micInputStream.on('processExitComplete', () => console.log("Got SIGNAL processExitComplete"));

    micInstance.start();
    return micInputStream;
  }


  logStreamEvents(streamName: string, stream: any) {
    stream.on('data', (chunk) => console.log(`${streamName}: on data`, chunk.length));
    stream.on('close', () => console.log(`${streamName}: close`));
    stream.on('end', () => console.log(`${streamName}: end`));
    stream.on('drain', () => console.log(`${streamName}: drain`));
    stream.on('error', (err) => console.error(`${streamName}: err`, err));
    stream.on('finish', () => console.log(`${streamName}: finish`));
    stream.on('pause', () => console.log(`${streamName}: pause`));
    stream.on('pipe', () => console.log(`${streamName}: pipe`));
    // stream.on('readable', () => console.log('stream readable')); 
    stream.on('resume', () => console.log(`${streamName}: resume`));
    stream.on('unpipe', () => console.log(`${streamName}: unpipe`));
  }
}
