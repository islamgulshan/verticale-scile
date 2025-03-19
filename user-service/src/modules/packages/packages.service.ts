import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Packages } from './packages.schema';
import { Model } from 'mongoose';

@Injectable()
export class PackagesService {
  constructor(
    @InjectModel(Packages.name)
    private PackagesModel: Model<Packages>,
  ) {}
  async create(dto: Partial<Packages>): Promise<Packages> {
    return this.PackagesModel.create({ ...dto });
  }

  async get(): Promise<Packages[]> {
    return this.PackagesModel.find({});
  }

  async getById(id: string): Promise<Packages> {
    return this.PackagesModel.findById({ _id: id });
  }
}
