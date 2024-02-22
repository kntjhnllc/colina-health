import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Allow requests from this origin
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  });

  await app.listen(3000);
}
bootstrap();
