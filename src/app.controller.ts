import { Controller, Get, Post, Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) { }

  @Get()
  @Render('index')
  getHello(): any {
    return {
      isProd: this.configService.get('NODE_ENV') == 'prod',
      message: 'Idle'
    };
  }

  @Post('broadcast')
  @UseInterceptors(FileInterceptor('audio_data'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    Readable.from(file.buffer).pipe(this.appService.ffmpegProcess.stdin);
  }
}
