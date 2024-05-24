import { Controller, Get, Header, Post, Render, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { AppService } from './app.service';

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

  @Get('stream.mp3')
  @Header('Cache-Control', 'no-store, no-cache, private')
  @Header('Content-Type', 'audio/mpeg')
  ffmpeg(@Req() req: Request, @Res() res: Response): any {
    res.setHeader('transfer-encoding', 'chunked');
    this.appService.mp3ReadableSteam.on('data', (chunk) => {
      res.write(chunk);
      res.flushHeaders();
    });
  }

  @Post('broadcast')
  @UseInterceptors(FileInterceptor('audio_data'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.appService.broadcast(file.buffer);
  }
}
