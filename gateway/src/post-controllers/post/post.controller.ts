import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../../constants';
import { PostFilesInterceptor } from '../../interceptors';
import {
  CreatePostRequestDto,
  PostFilterationDto,
  UpdatePostRequestDto,
} from './dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
@ApiBearerAuth(TOKEN_NAME)
@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(
    @Inject('POST_SERVICE') private readonly PostServiceClient: ClientProxy,
  ) {}

  @Post()
  @UseInterceptors(PostFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreatePostRequestDto })
  async create(
    @Body() body: any,
    @Req() request: any,
    @UploadedFiles()
    files: {
      attachments?: Express.Multer.File[];
      thumbnail?: Express.Multer.File[];
    },
  ) {
    const post_urls =
      files?.attachments?.map((image) => {
        return `/uploads/${image.filename}`;
      }) || [];
    body.attachments = post_urls?.map((x) => x);
    const dto = plainToInstance(CreatePostRequestDto, {
      ...body,
      attachments: post_urls,
      thumbnail: files.thumbnail.length
        ? `/uploads/${files.thumbnail[0].filename}`
        : '',
    });
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return await firstValueFrom(
      this.PostServiceClient.send('create-post', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await firstValueFrom(
      this.PostServiceClient.send('get-post-by-id', id),
    );
  }

  @Get()
  async getAll(@Query() dto: PostFilterationDto) {
    return await firstValueFrom(this.PostServiceClient.send('get-posts', dto));
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await firstValueFrom(this.PostServiceClient.send('delete-post', id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdatePostRequestDto) {
    return await firstValueFrom(
      this.PostServiceClient.send('update-post', { ...body, id }),
    );
  }
}
