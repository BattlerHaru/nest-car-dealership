import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // lvl global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // solo admite la data necesaria
      forbidNonWhitelisted: true // muestra errores en data no necesaria
    })
  )
  await app.listen(3000);
}
bootstrap();
