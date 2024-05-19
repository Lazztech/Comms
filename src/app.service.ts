
import { Injectable } from '@nestjs/common';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import * as mic from 'mic';
import { Readable } from 'stream';

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
    const micStream = this.startMicStream();
  }

  startMicStream(): Readable {
    const micInstance = mic({
      rate: '16000',
      channels: '1',
      debug: true,
      // exitOnSilence: 6
    });
    const micInputStream = micInstance.getAudioStream();

    micInputStream.on('data', function (data) {
      console.log("Recieved Input Stream: " + data.length);
    });

    micInputStream.on('error', function (err) {
      console.log("Error in Input Stream: " + err);
    });

    micInputStream.on('startComplete', function () {
      console.log("Got SIGNAL startComplete");
      setTimeout(function () {
        micInstance.pause();
      }, 5000);
    });

    micInputStream.on('stopComplete', function () {
      console.log("Got SIGNAL stopComplete");
    });

    micInputStream.on('pauseComplete', function () {
      console.log("Got SIGNAL pauseComplete");
      setTimeout(function () {
        micInstance.resume();
      }, 5000);
    });

    micInputStream.on('resumeComplete', function () {
      console.log("Got SIGNAL resumeComplete");
      // setTimeout(function () {
      //   micInstance.stop();
      // }, 5000);
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

  broadcast() {
    this.ffmpegProcess.stdout
  }
}
