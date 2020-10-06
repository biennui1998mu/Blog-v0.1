import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userSchema } from '../../models/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXP_SEC
      }
    }),
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
