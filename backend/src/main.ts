import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para frontend en Vite (http://localhost:5173)
  app.enableCors({
    origin: [
      'http://localhost:3000', // tu frontend
      'http://localhost:5173', // si usas vite
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Escuchar en el puerto 3000
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
