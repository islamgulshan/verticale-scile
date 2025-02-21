import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './services/config/config.service';
import * as dotenv from 'dotenv';
import { CatchInterceptor, ResponseInterceptor } from './interceptors';
import { AUTH_OPTIONS, TOKEN_NAME } from './constants/jwt.constant';
import path = require('path');

async function bootstrap() {
  const app:any = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('API docs')
    .addTag('users')
    .addTag('tasks')
    .setVersion('1.0')
    .addBearerAuth(AUTH_OPTIONS,TOKEN_NAME)
    .build();
  // enable cors
  app.enableCors();
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new CatchInterceptor());
  let folder=path.join(process.cwd(),`/mnt/data`)
  app.useStaticAssets(folder, {
    prefix: '/videos/',
  });
  dotenv.config();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(new ConfigService().get('port'));
}
bootstrap();
