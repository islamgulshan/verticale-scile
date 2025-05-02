import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/models/post';
import { HashTagService } from '../hash-tag/hash-tag.service';
import {
  getPagination,
  PaginatedResponse,
  PaginatedResponseType,
} from 'src/common';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private PostModel: Model<Post>,
    private hashTagService: HashTagService,
  ) {}
  async create(dto: Partial<Post>): Promise<Post> {
    if (dto.hashtags?.length) {
      const hashtags = await Promise.all(
        dto.hashtags.map((x: any) => this.hashTagService.create(x)),
      );
      dto['hashtags'] = hashtags?.map((x) => x._id) as any;
    }
    return this.PostModel.create(dto);
  }

  async getById(id: string): Promise<Post> {
    const post = await this.PostModel.findById(id).populate([
      'hashtags',
      'season',
      { path: 'tags', select: 'user_name email ' },
      { path: 'user_id', select: 'user_name email ' },
    ]);
    if (!post) throw new NotFoundException('post not found');
    return post;
  }

  async getAll(dto: {
    user_id?: string;
    season?: string;
    page?: number;
    limit: number;
  }): Promise<PaginatedResponseType<Post>> {
    const { page, limit, skip } = getPagination(dto.page, dto.limit);
    const filter = {};
    if (dto.user_id?.trim()) {
      filter['user_id'] = dto.user_id;
    }
    if (dto.season?.trim()) {
      filter['season'] = dto.season;
    }
    const [data, total] = await Promise.all([
      this.PostModel.find(filter)
        .populate([
          'hashtags',
          'season',
          { path: 'tags', select: 'user_name email ' },
          { path: 'user_id', select: 'user_name email ' },
        ])
        .skip(skip)
        .limit(limit),
      this.PostModel.countDocuments(filter),
    ]);

    return PaginatedResponse(data, total, page, limit);
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
