import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove any props not in the DTO
      transform: true, // coerce payload into your DTO class
    }),
  );

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Vertical Slice API')
    .setDescription('API for job matching')
    .setVersion('1.0')
    .addTag('jobs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Listen on port (default 3000)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
