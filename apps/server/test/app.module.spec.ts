import { AppModule } from 'src/app.module';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

// TODO: Fix the tests
// eslint-disable-next-line jest/no-disabled-tests
describe.skip('AppModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should compile the module', async () => {
    expect(module).toBeDefined();
  });

  it('should have ConfigService', () => {
    const configService = module.get<ConfigService>(ConfigService);
    expect(configService).toBeDefined();
  });

  it('should have MongooseModule', () => {
    const mongooseModule = module.get<MongooseModule>(MongooseModule);
    expect(mongooseModule).toBeDefined();
  });
});
