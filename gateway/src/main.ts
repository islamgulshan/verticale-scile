import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './services/config/config.service';
import * as dotenv from 'dotenv';
import { CatchInterceptor, ResponseInterceptor } from './interceptors';
import { AUTH_OPTIONS, TOKEN_NAME } from './constants';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';
async function bootstrap() {
  const app: any = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('FOS Social Scope APIs Docs')
    .setVersion('1.0')
    .addBearerAuth(AUTH_OPTIONS, TOKEN_NAME)
    .build();
  app.enableCors();
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new CatchInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  dotenv.config();
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(new ConfigService().get('port'));
}
bootstrap();
