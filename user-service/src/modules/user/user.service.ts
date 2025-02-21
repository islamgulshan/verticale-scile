import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>,
    ) { }
    async create(args: CreateUserDto): Promise<any> {
        args.password = await bcrypt.hash(args.password, 12);
        const data:any=await this.UserModel.create({...args });
       const {password,...rest}=data?._doc
        return rest
      }
      async findOne(args: any): Promise<User> {
        return this.UserModel.findOne({...args });
       
      }
}
