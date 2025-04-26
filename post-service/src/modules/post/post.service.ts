import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/models/post';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private PostModel: Model<Post>,
  ) {}
  async create(dto: Partial<Post>): Promise<Post> {
    return this.PostModel.create(dto);
  }

  async getById(id: string): Promise<Post> {
    const post = await this.PostModel.findById(id);
    if (!post) throw new NotFoundException('post not found');
    return post;
  }

  async getAll(): Promise<Post[]> {
    return this.PostModel.find();
  }

  async delete(id: string): Promise<Post> {
    return this.PostModel.findByIdAndDelete(id);
  }
  async update(id: string, dto: Partial<Post>): Promise<Post> {
    return this.PostModel.findByIdAndUpdate(
      { _id: id },
      { ...dto },
      { new: true },
    );
  }
}
