
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import { Injectable } from '@nestjs/common';
import { ChildProcessWithoutNullStreams } from 'child_process';
import * as mic from 'mic';
import { Readable } from 'stream';

@Injectable()
export class AppService {
  ffmpegProcess: ChildProcessWithoutNullStreams;
  micStream: Readable;

  constructor() {
    this.start();
  }

  getHello(): string {
    return 'Hello World!';
  }

  start() {
    console.log(ffmpegPath)
    this.micStream = this.startMicStream();
  }

  startMicStream(): Readable {
    const micInstance = mic({
      rate: '16000',
      channels: '1',
      debug: true,
      fileType: 'wav'
      // exitOnSilence: 6
    });
    const micInputStream = micInstance.getAudioStream();
    console.log(micInputStream)

    micInputStream.on('data', function (data) {
      console.log("Recieved Input Stream: " + data.length);
    });

    micInputStream.on('error', function (err) {
      console.log("Error in Input Stream: " + err);
    });

    micInputStream.on('startComplete', function () {
      console.log("Got SIGNAL startComplete");
    });

    micInputStream.on('stopComplete', function () {
      console.log("Got SIGNAL stopComplete");
    });

    micInputStream.on('pauseComplete', function () {
      console.log("Got SIGNAL pauseComplete");
    });

    micInputStream.on('resumeComplete', function () {
      console.log("Got SIGNAL resumeComplete");
    });

    micInputStream.on('silence', function () {
      console.log("Got SIGNAL silence");
    });

    micInputStream.on('processExitComplete', function () {
      console.log("Got SIGNAL processExitComplete");
    });

    micInstance.start();
    return micInputStream;
  }
}
