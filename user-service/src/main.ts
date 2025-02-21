import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';

import { ConfigService } from './config/config/config.service';
import { AppModule } from './app.module';
import { CatchInterceptor, ResponseInterceptor } from './interceptor';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host:  new ConfigService().get('host'),
      port: new ConfigService().get('port'),
    },
  } as TcpOptions);
  console.log(new ConfigService().get('port'))
  app.useGlobalInterceptors(new CatchInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen();
}
bootstrap();

