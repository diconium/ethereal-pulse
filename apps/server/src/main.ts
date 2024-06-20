import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { setupSwagger } from './config/swagger/swagger.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  setupSwagger(app);

  const port = configService.get<number>('port') || 3000;
  await app.listen(port);
}
bootstrap();
