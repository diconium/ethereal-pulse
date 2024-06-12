import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  // imports: [
  //   MongooseModule.forRoot('mongodb://root:example@mongo:27017/mydatabase?authSource=admin'),
  // ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
