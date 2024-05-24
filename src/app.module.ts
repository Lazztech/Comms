import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AppGateway } from './app/app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      // dest: './data',
    })
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
