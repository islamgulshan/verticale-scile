import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { Otp, OtpDocument } from './otp.schema';
import { EmailService } from '../email/email.service';
import { otpHtml } from 'src/config/common/functions';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectModel(Otp.name) private OtpModel: Model<OtpDocument>,
    private emailService: EmailService
  ) { }
  async create(args: CreateUserDto): Promise<any> {
    args.password = await bcrypt.hash(args.password, 12);
    const data: any = await this.UserModel.create({ ...args });
    const { password, ...rest } = data?._doc
    return rest
  }

  async findAll(search: string, page: number = 1, limit: number = 10): Promise<{ users: User[]; total: number; page: number; limit: number }> {
    let filter: any = {};

    if (search?.trim()) {
      filter.user_name = { $regex: search.trim(), $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.UserModel.find(filter)
        .select("user_name email")
        .skip(skip)
        .limit(limit),
      this.UserModel.countDocuments(filter)
    ]);

    return {
      users,
      total,
      page,
      limit
    };
  }


  async findOne(args: any): Promise<User> {
    return this.UserModel.findOne({ ...args })
  }
  async getById(id: string): Promise<User> {
    const data = await this.UserModel.findById({ _id: id }).select("user_name email")
    if (!data) throw new NotFoundException("user not found")
    return data
  }

  async update(id: string, input: CreateUserDto): Promise<User> {
    return this.UserModel.findByIdAndUpdate({ _id: id }, { ...input }, { new: true }).select("user_name email")
  }

  async delete(id: string): Promise<User> {
    const data = await this.UserModel.findByIdAndDelete({ _id: id }).select("user_name email")
    if (!data) throw new NotFoundException("user not found")
    return data
  }

  async getOtp(email: string): Promise<boolean> {
    const otp = Math.floor(100000 + Math.random() * 900000)
    const expireIn = Date.now() + 60 * 60 * 1000;
    await this.OtpModel.findOneAndUpdate({ email: email }, { $set: { email: email, otp: otp, expireIn: expireIn } }, { upsert: true });
    await this.emailService.sendMail(email, "FOS OTP", otp.toString(), otpHtml(otp))
    return true
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const record = await this.OtpModel.findOne({ email: email, otp: otp });
    if (!record) throw new NotFoundException('Invalid OTP provided!');
    if (record.expireIn < Date.now()) throw new NotFoundException("OTP expired!");
    return true;
  }
  async resetPassword(args: any): Promise<boolean> {
    await this.verifyOtp(args.email, args.code)
    args.password = await bcrypt.hash(args.password, 12);
    await this.UserModel.findOneAndUpdate({ email: args.email }, { ...args });
    return true
  }

}
