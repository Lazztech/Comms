
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import { Injectable } from '@nestjs/common';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import * as mic from 'mic';
import { Readable } from 'stream';
import * as wav from 'wav';

@Injectable()
export class AppService {
  ffmpegProcess: ChildProcessWithoutNullStreams;
  micStream: Readable;
  ffmpegOutput: Readable;

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

  startFfmpeg() {
    // 'ffmpeg -use_wallclock_as_timestamps true -f wav -re -i pipe: -codec:a aac -b:a 128k -af aresample=async=1 -f mp3 -'
    this.ffmpegProcess = spawn(ffmpegPath, [
      '-f', 'wav',
      '-i', 'pipe:', // stdin input source
      '-codec:a', 'aac',
      '-b:a', '128k',
      '-af', 'aresample=async=1',
      '-f', 'mp3',
      '-'
    ]);
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
    console.log(micInputStream);

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
