import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { setupSwagger } from './config/swagger/swagger.config';
import { ConfigService } from '@nestjs/config';
import { MongooseValidationFilter } from './common/filters/mongoose-validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  setupSwagger(app);

  app.useGlobalFilters(new MongooseValidationFilter());

  const port = configService.get<number>('port') || 3000;
  await app.listen(port);
}
bootstrap();
