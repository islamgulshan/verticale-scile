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
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../../constants';
import { MultipleFileUploadInterceptor } from '../../interceptors';
import { CreatePostRequestDto, UpdatePostRequestDto } from './dto';
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
  @UseInterceptors(MultipleFileUploadInterceptor('attachments'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreatePostRequestDto })
  async create(
    @Body() body: any,
    @Req() request: any,
    @UploadedFiles() attachments: Express.Multer.File[],
  ) {
    const post_urls = attachments?.map((image) => {
      return `/uploads/${image.filename}`;
    });
    body.attachments = post_urls?.map((x) => x);
    const dto = plainToInstance(CreatePostRequestDto, {
      ...body,
      attachments: post_urls,
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
  async getAll() {
    return await firstValueFrom(this.PostServiceClient.send('get-posts', {}));
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
