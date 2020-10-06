import { userDto } from './../../dtos/user.dto';
import { ReturnData } from './../../../dist/config/ReturnData.config.d';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private userModel: Model<User>
    ){}

    async findbyId(id: string): Promise<ReturnData>{
        const user = await this.userModel.findById(id).exec();

        if(!user){
            return {
                message: 'User does not exist!'
            }
        }

        return {
            message: 'Query user successfully!',
            data: user
        };
    }

    async findbyName(username: string): Promise<ReturnData>{
        const user = await this.userModel.findOne({username}).exec();

        if(!user){
            return {
                message: 'User does not exist!'
            }
        }

        return {
            message: 'Query user successfully!',
            data: user
        };
    }

    async create(user: userDto): Promise<ReturnData> {
        const {username, password, name} = user;

        if(!name || typeof name !== 'string' || name.length === 0){
            return {
                message: 'Name field must be valid!'
            }
        }

        if(!username || typeof username !== 'string' || username.length === 0){
            return {
                message: 'Username field must be valid!'
            }
        }

        const checked = await this.findbyName(user.username);

        if(checked.data){
            return {
                message: 'Username exist!'
            }
        }

        if(!password || typeof password !== 'string' || password.length === 0){
            return {
                message: 'Password field must be valid!'
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const savedUser = new this.userModel({
            name,
            username,
            password: hashedPassword
        })

        const saved = await savedUser.save();

        if(!saved){
            return {
                message: 'Save into database met error!'
            }
        }

        const userObject = saved.toObject();
        delete userObject.password;
        delete userObject.__v;

        return {
            message: 'Create account successfully!',
            data: userObject
        };
    }
}
