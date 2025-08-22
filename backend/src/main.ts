import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🚨 Habilitar CORS
  app.enableCors({
    origin: [
      'http://localhost:3000', // tu frontend
      'http://localhost:5173', // si usas vite
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();




