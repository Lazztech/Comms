import { Controller, Get, Post, Render, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { Request, Response } from 'express';

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

  @Get('listen.wav')
  listen(@Req() req: Request, @Res() res: Response): any {
    this.appService.micStream.pipe(res);
  }

  @Post('broadcast')
  @UseInterceptors(FileInterceptor('audio_data'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    Readable.from(file.buffer).pipe(this.appService.ffmpegProcess.stdin);
  }
}
