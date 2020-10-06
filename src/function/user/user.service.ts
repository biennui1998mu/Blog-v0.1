import { JwtService } from '@nestjs/jwt';
import { AuthService } from './../auth/auth/auth.service';
import { userDto } from './../../dtos/user.dto';
import { ReturnData } from './../../../dist/config/ReturnData.config.d';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>, 
    // private jwtService: JwtService,
  ) {}

  async findbyId(id: string): Promise<ReturnData> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      return {
        message: 'User does not exist!',
      };
    }

    return {
      message: 'Query user successfully!',
      data: user,
    };
  }

  async findbyName(username: string): Promise<ReturnData> {
    const user = await this.userModel.findOne({ username }).exec();

    if (!user) {
      return {
        message: 'User does not exist!',
      };
    }

    return {
      message: 'Query user successfully!',
      data: user,
    };
  }

  async create(user: userDto): Promise<ReturnData> {
    const { username, password, name, email } = user;

    if (!name || typeof name !== 'string' || name.length === 0) {
      return {
        message: 'Name field must be valid!',
      };
    }

    if (
      !email ||
      typeof email !== 'string' ||
      email.length === 0 ||
      email.length < 8
    ) {
      return {
        message: 'Email field must be valid!',
      };
    }

    if (!username || typeof username !== 'string' || username.length === 0) {
      return {
        message: 'Username field must be valid!',
      };
    }

    const checkedUsername = await this.findbyName(user.username);
    // const checkedEmail = await this.findbyName(user.email);

    if (checkedUsername.data) {
      return {
        message: 'Username exist!',
      };
    }

    // if(checkedEmail.data){
    //     return {
    //         message: 'Gmail exist!'
    //     }
    // }

    if (
      !password ||
      typeof password !== 'string' ||
      password.length === 0 ||
      password.length < 8
    ) {
      return {
        message: 'Password field must be valid!',
      };
    }

    // const hashedPassword = this.authService.hashPassword(password);
    const hashedPassword = await bcrypt.hash(password, 10);

    const savedUser = new this.userModel({
      name,
      username,
      password: hashedPassword,
      email,
    });

    const saved = await savedUser.save();

    if (!saved) {
      return {
        message: 'Save into database met error!',
      };
    }

    const userObject = saved.toObject();
    delete userObject.password;
    delete userObject.__v;

    return {
      message: 'Create account successfully!',
      data: userObject,
    };
  }

  async join(user: userDto): Promise<ReturnData> {
    const { username, password } = user;

    if (!username || typeof username !== 'string' || username.length === 0) {
      return {
        message: 'Username field must be valid!',
      };
    }

    const checkedUser = await this.userModel
      .findOne({ username })
      .select('+password')
      .exec();

    if (!checkedUser) {
      return {
        message: 'Username is not exist!',
      };
    }

    if (
      !password ||
      typeof password !== 'string' ||
      password.length === 0 ||
      password.length < 8
    ) {
      return {
        message: 'Password field must be valid!',
      };
    }

    const checkedPassword = await bcrypt.compare(
      password,
      checkedUser.password,
    );

    if (!checkedPassword) {
      return {
        message: 'Wrong password!',
      };
    }

    // const payload = { username };
    // const token = await this.jwtService.sign(payload)

    const userObject = await checkedUser.toObject();
    delete userObject.password;
    delete userObject.__v;
    delete userObject.createdAt;

    return {
      message: 'Login successfully!',
      data: userObject,
    };
  }
}
