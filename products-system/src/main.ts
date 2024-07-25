import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ValidationPipe, VersioningType } from '@nestjs/common';
// import { environment } from 'src/environments/environment';
import * as fs from 'fs';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn']
  });

  app.enableVersioning({
    type: VersioningType.URI
  }).setGlobalPrefix(process.env.API_PREFIX);

  const config = new DocumentBuilder()
      .setTitle('First NestJS API')
      .setDescription('Teste de nestjs como api')
      .setVersion('1.0')
      .addTag('nestjs')
      .build()
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({
    origin: '*',
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS,PATCH",
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
