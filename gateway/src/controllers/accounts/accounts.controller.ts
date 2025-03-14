import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AccountsDtos, DeActivateAccountDto } from './dtos';
import { firstValueFrom } from 'rxjs';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Express } from 'express';
import { TOKEN_NAME } from '../../constants/jwt.constant';
import { FileUploadInterceptor } from '../../interceptors/file-upload';
@ApiTags('accounts')
@ApiBearerAuth(TOKEN_NAME)
@Controller('accounts')
export class AccountsController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}
  @Post('create-update-accounts-verification')
  @UseInterceptors(FileUploadInterceptor('license'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create update account verification',
    schema: {
      type: 'object',
      properties: {
        license: { type: 'string', format: 'binary' },
        reasons: {
          type: 'array',
          items: { type: 'string' },
          example: ['Missing documents', 'license'],
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Create update account verification',
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() request: any,
  ) {
    let parsedBody;
    if (typeof body['reasons'] !== 'string') {
      parsedBody = {
        account_verification: body,
      };
    } else {
      parsedBody = {
        account_verification: body?.reasons
          ? {
              reasons: body['reasons']
                ? body['reasons'].split(',').map((reason) => reason.trim())
                : [],
            }
          : {},
      };
    }
    if (file) {
      parsedBody.account_verification.license = `/uploads/${file.filename}`;
    }
    return await firstValueFrom(
      this.UserServiceClient.send('create-update-accounts-verification', {
        ...parsedBody,
        user_id: request.user?._id,
      }),
    );
  }

  @Post('create-update-accounts')
  @ApiOperation({
    summary: 'Create update accounts',
  })
  async createPersnalInfo(@Body() body: AccountsDtos, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('create-update-accounts', {
        ...body,
        user_id: request.user?._id,
      }),
    );
  }

  @Get('get-user-account')
  async getByUser(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('user-accounts', request.user?._id),
    );
  }

  @Post('de-active')
  async deActive(@Body() dto: DeActivateAccountDto, @Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('decativation-accounts', {
        ...dto,
        user_id: request.user?._id,
      }),
    );
  }
  @Delete('delete-account')
  async delete(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send('delete-accounts', request.user?._id),
    );
  }
}
