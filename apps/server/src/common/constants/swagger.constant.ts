import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Ethereal Pulse')
  .setDescription('OpenAPI Spec for Ethereal Pulse API')
  .setVersion('0.1')
  .build();
