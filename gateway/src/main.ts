import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './services/config/config.service';
import * as dotenv from 'dotenv';
import { CatchInterceptor, ResponseInterceptor } from './interceptors';
import { AUTH_OPTIONS, TOKEN_NAME } from './constants/jwt.constant';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app:any = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('FOS Social Scope APIs Docs')
    .setVersion('1.0')
    .addBearerAuth(AUTH_OPTIONS,TOKEN_NAME)
    .build();
  app.enableCors();
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new CatchInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  dotenv.config();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  console.log(new ConfigService().get('port'))
  await app.listen(3000);
}
bootstrap();
