import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from '../../constants';
import { PackagesDto } from './dtos';
@ApiBearerAuth(TOKEN_NAME)
@ApiTags('packages ')
@Controller('packages')
export class PackagesController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() dto: PackagesDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('create-package', {
        ...dto,
        created_by: request.user?._id,
      }),
    );
  }

  @Get()
  async get() {
    return await firstValueFrom(
      this.UserServiceClient.send('get-packages', {}),
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await firstValueFrom(this.UserServiceClient.send('get-package', id));
  }
}
