import { UserController } from './function/user/user.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './function/user/user.module';
import * as dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${username}:${password}@nosama.dstgw.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    ),
    UserModule,
  ]
})
export class AppModule {}
