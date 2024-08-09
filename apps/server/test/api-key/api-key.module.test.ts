import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiKeyModule } from '../../src/api-key/api-key.module';
import { ApiKeyService } from '../../src/api-key//services/api-key.service';
import { ApiKeyController } from '../../src/api-key//controllers/api-key.controller';
import { ApiKeyRepository } from '../../src/authentication/repositories/api-key.repository';
import {
  ApiKey,
  ApiKeySchema,
} from '../../src/database/schemas/api-key.schema';
import { DatabaseModule } from '../../src/database/database.module';
import { AuthenticationModule } from '../../src/authentication/authentication.module';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

describe('ApiKeyModule', () => {
  let module: TestingModule;
  let connection: Connection;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/test'),
        MongooseModule.forFeature([
          { name: ApiKey.name, schema: ApiKeySchema },
        ]),
        AuthenticationModule,
        DatabaseModule,
        ApiKeyModule,
      ],
      providers: [ApiKeyService, ApiKeyRepository],
      controllers: [ApiKeyController],
    }).compile();
    connection = module.get<Connection>(getConnectionToken());
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should be defined', () => {
    const apiKeyModule = module.get<ApiKeyModule>(ApiKeyModule);
    expect(apiKeyModule).toBeDefined();
  });
});
