import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { Otp, OtpDocument } from './otp.schema';
import { EmailService } from '../email/email.service';
import { otpHtml } from 'src/config/common/functions';
import { RpcException } from '@nestjs/microservices';
@Injectable()
export class UserService {
    constructor(
      @InjectModel(User.name) private UserModel: Model<UserDocument>,
      @InjectModel(Otp.name) private OtpModel: Model<OtpDocument>,
      private emailService: EmailService
    ) { }
    async create(args: CreateUserDto): Promise<any> {
        args.password = await bcrypt.hash(args.password, 12);
        const data:any=await this.UserModel.create({...args });
       const {password,...rest}=data?._doc
        return rest
      }

      async findAll(search: any): Promise<User[]> {
        console.log(search)
        let filter:any={}
        if (search?.trim()) {
          filter.user_name = { $regex: search.trim(), $options: 'i' }
      }
        return this.UserModel.find(filter).select("user_name email");
      }

      async findOne(args: any): Promise<User> {
        return this.UserModel.findOne({...args })
       
      }
      async getById(id: string): Promise<User> {
        return this.UserModel.findById({_id:id }).select("user_name email")
      }

      async update(id: string ,input:CreateUserDto): Promise<User> {
        return this.UserModel.findByIdAndUpdate({_id:id },{...input},{new:true}).select("user_name email")
      }

      async delete(id: string): Promise<User> {
        return this.UserModel.findByIdAndDelete({_id:id }).select("user_name email")
      }

      async getOtp(email: string): Promise<number> {
        const otp = Math.floor(100000 + Math.random() * 900000)
        const expireIn = Date.now() + 60 * 60 * 1000;
        await this.OtpModel.findOneAndUpdate({email:email },{$set:{email:email,otp:otp,expireIn:expireIn}},{upsert:true});
        await this.emailService.sendMail(email,"FOS OTP",otp.toString(),otpHtml(otp))
        return otp
      }

      async verifyOtp(email: string, otp: string): Promise<boolean> {
        const record = await this.OtpModel.findOne({ email: email, otp: otp });
        if (!record)
        throw new RpcException('Invalid OTP provided!');
        if (record.expireIn < Date.now()) throw new RpcException("OTP expired!"); 
        return true; 
    }
    async resetPassword(args: any): Promise<boolean> {
      await this.verifyOtp(args.email,args.code)
      args.password = await bcrypt.hash(args.password, 12);
      await this.UserModel.findOneAndUpdate({email:args.email},{...args });
      return true
    }

}
