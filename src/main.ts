import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', { exclude: [''] });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().then(
  () => console.log(`bootstrap successful`),
  () => console.log('bootstrap failed'),
);
