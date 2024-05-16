import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Get()
  @Render('index')
  getHello(): any {
    return {
      isProd: this.configService.get('NODE_ENV') == 'prod',
      message: this.appService.getHello() 
    };
  }
}
