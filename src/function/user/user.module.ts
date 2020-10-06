import { JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userSchema } from '../../models/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
