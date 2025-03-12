import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TOKEN_NAME } from '../../../constants/jwt.constant';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AssistancePetitionDto } from './dtos';
@ApiBearerAuth(TOKEN_NAME)
@ApiTags('Assistance Petition')
@Controller('petition')
export class PetitionController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() dto: AssistancePetitionDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('create-assistance-petition', {
        ...dto,
        creator: request.user?._id,
      }),
    );
  }
  @ApiOperation({
    summary: 'Get Petitiom list with optional date filter & pagination',
  })
  @ApiQuery({
    name: 'date',
    required: false,
    example: '2025-03-01',
    description: 'Optional date I filter',
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
    @Query('date') date?: string,
  ) {
    const payload = {
      date: date,
      page: Number(page),
      limit: Number(limit),
    };
    return await firstValueFrom(
      this.UserServiceClient.send('get-assistance-petition', payload),
    );
  }
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await firstValueFrom(
      this.UserServiceClient.send('get-assistance-petition-by-id', id),
    );
  }
  @Get('/supporters/:id')
  async getPetitionSuppoters(@Param('id') id: string) {
    return await firstValueFrom(
      this.UserServiceClient.send('get-assistance-petition-suppoters', id),
    );
  }

  @Post('/support:id')
  async supportPetition(@Param('id') id: string, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('support-assistance-petition', {
        id,
        user_id: request.user._id,
      }),
    );
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await firstValueFrom(
      this.UserServiceClient.send('delete-assistance-petition', id),
    );
  }
}
