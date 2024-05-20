
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import { Injectable } from '@nestjs/common';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import * as mic from 'mic';
import { Readable } from 'stream';
import * as wav from 'wav';
import MemoryStream = require("memorystream");

@Injectable()
export class AppService {
  ffmpegMicProcess: ChildProcessWithoutNullStreams;
  ffmpegMicOutput: Readable;

  ffmpegBroadcastProcess: ChildProcessWithoutNullStreams;
  ffmpegBroadcastOutput: Readable;

  stream: MemoryStream;

  micStream: Readable;

  constructor() {
    this.start();
  }

  getHello(): string {
    return 'Hello World!';
  }

  start() {
    console.log(ffmpegPath)
    this.ffmpegMicOutput = this.startFfmpegMicProcess();
    this.ffmpegBroadcastOutput = this.startFfmpegBroadcastProcess();
    // this.micStream = this.startMicStream();
    this.stream = new MemoryStream();
    this.ffmpegMicOutput.pipe(this.stream);
    this.ffmpegBroadcastOutput.pipe(this.stream);
  }

  startFfmpegMicProcess() {
    // ffmpeg -use_wallclock_as_timestamps true -f wav -re -i pipe: -codec:a aac -b:a 128k -af aresample=async=1 -f mp3 -
    // ffmpeg -use_wallclock_as_timestamps true -f avfoundation -i :1 -f wav -re -i pipe: -codec:a aac -b:a 128k -af aresample=async=1 -filter_complex amerge=inputs=2 -f mp3 -
    this.ffmpegMicProcess = spawn(ffmpegPath, [
      '-f', 'avfoundation', // mac os media devices
      '-i', ':1', // mac os microphone input
      '-f', 'mp3',
      '-'
    ]);
    return this.ffmpegMicProcess.stdout;
  }

  startFfmpegBroadcastProcess() {
    // ffmpeg -hide_banner -y -use_wallclock_as_timestamps true -f s16le -ar 48000 -ac 1 -i pipe:0 -af aresample=async=1 -ac 1 -
    // ffmpeg -hide_banner -y -use_wallclock_as_timestamps true -f ogg -c copy -ar 48000 -ac 1 -i pipe:0 -af aresample=async=1 -ac 1 -
    // ffmpeg -hide_banner -y -use_wallclock_as_timestamps true -f wav -c copy -ar 48000 -ac 1 -i pipe: -f mp3 -af aresample=async=1 -ac 1 -
    this.ffmpegBroadcastProcess = spawn(ffmpegPath, [
      '-f', 'wav', // mac os media devices
      '-i', 'pipe:', // mac os microphone input
      '-f', 'mp3',
      '-'
    ]);
    return this.ffmpegBroadcastProcess.stdout;
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
