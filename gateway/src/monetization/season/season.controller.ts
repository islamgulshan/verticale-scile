import {
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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TOKEN_NAME } from '../../constants/jwt.constant';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateSeasonsDto, UpdateSeasonsDto } from './dtos';
import { boolean } from 'joi';
@ApiBearerAuth(TOKEN_NAME)
@ApiTags('Season Monetization')
@Controller('season')
export class SeasonController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() dto: CreateSeasonsDto, @Req() request: any) {
    console.log(dto);
    return await firstValueFrom(
      this.UserServiceClient.send('create-season-monetization', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }
  @ApiOperation({
    summary: 'Get monetization list with optional user filter & pagination',
  })
  @ApiQuery({
    name: 'user_id',
    required: false,
    example: '',
    description: 'Optional user ID to filter',
  })
  @ApiQuery({
    name: 'premium_monetization',
    required: false,
    example: true,
    description: 'Optional premium monetization to filter',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Items per page',
  })
  @Get()
  async getList(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('user_id') user_id?: string,
    @Query('premium_monetization') premium_monetization?: any,
  ) {
    const payload = {
      user_id: user_id,
      page: Number(page),
      limit: Number(limit),
      premium_monetization,
    };
    return await firstValueFrom(
      this.UserServiceClient.send('get-season-monetization', payload),
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await firstValueFrom(
      this.UserServiceClient.send('get-season-monetization-by-id', id),
    );
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSeasonsDto) {
    return await firstValueFrom(
      this.UserServiceClient.send('update-season-monetization', { id, dto }),
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await firstValueFrom(
      this.UserServiceClient.send('delete-season-monetization', id),
    );
  }
}
