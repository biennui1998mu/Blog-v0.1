import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const username = process.env.DB_USER || "biennui1998mu";
const password = process.env.DB_PASSWORD || "gUsyaalq5ZSGlAK8";
const dbName = process.env.DB_NAME || "blog";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${username}:${password}@nosama.dstgw.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
