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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../../constants';
import { firstValueFrom } from 'rxjs';
import { CreateSeasonRequestDto, SeasonFilterationDto } from './dto';

@ApiBearerAuth(TOKEN_NAME)
@ApiTags('Season Post')
@Controller('season-post')
export class SeasonController {
  constructor(
    @Inject('POST_SERVICE') private readonly PostServiceClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() dto: CreateSeasonRequestDto) {
    return await firstValueFrom(
      this.PostServiceClient.send('create-season', {
        ...dto,
      }),
    );
  }

  @Get()
  async geAll(@Query() dto?: SeasonFilterationDto) {
    return await firstValueFrom(
      this.PostServiceClient.send('get-seasons', dto),
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await firstValueFrom(this.PostServiceClient.send('get-season', id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CreateSeasonRequestDto) {
    return await firstValueFrom(
      this.PostServiceClient.send('update-season', { ...dto, id }),
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await firstValueFrom(
      this.PostServiceClient.send('delete-season', id),
    );
  }
}
