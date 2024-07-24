import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger/swagger.config';
import { MongooseValidationFilter } from './common/filters/mongoose-validation.filter';
import { MongoDuplicateKeyErrorFilter } from './common/filters/mongo-duplicate-key-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);

  app.useGlobalFilters(
    new MongooseValidationFilter(),
    new MongoDuplicateKeyErrorFilter(),
  );

  const port = configService.get<number>('port') ?? 8080;
  console.log(`Application is starting on port: ${port}`); // Log for testing purposes, changing just for deploy trigger
  await app.listen(port);
}
bootstrap();
