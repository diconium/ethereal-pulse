import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import * as path from 'path';

export function setupSwagger(app: INestApplication): void {
  const yamlDocument = fs.readFileSync(
    path.join(__dirname, 'swagger.yaml'),
    'utf8',
  );
  const document = yaml.load(yamlDocument) as OpenAPIObject;

  SwaggerModule.setup('/', app, document);
}
