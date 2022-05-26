import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { API_VERSION } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(API_VERSION);
  app.useGlobalPipes(new ValidationPipe({ validationError: { target: false } }));
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/${API_VERSION}`);
  });
}
bootstrap();
