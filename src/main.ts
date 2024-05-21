import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as pem from 'pem';

async function bootstrap(httpsOptions: { key: any, cert: any }) {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    { httpsOptions }
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}

pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
  bootstrap({ key: keys.clientKey, cert: keys.certificate });
})
