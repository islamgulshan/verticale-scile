import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Inject,
  Req,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AccountMonetizationDto } from './dtos';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { TOKEN_NAME } from '../../../constants';
import { Express } from 'express';
import { FileUploadInterceptor } from '../../../interceptors';

@ApiBearerAuth(TOKEN_NAME)
@ApiTags('Account Monetization')
@Controller('account-monetization')
export class AccountMonetizationController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}

  @Post('create-account-monetization')
  @UseInterceptors(FileUploadInterceptor('driving_license'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create Account Monetization',
    type: AccountMonetizationDto,
  })
  async createMonetization(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() request: any,
  ) {
    try {
      console.log('🚀 Received body:', body);

      // ✅ Parse `user_benefit` array properly
      let userBenefits = [];
      if (body.user_benefit) {
        try {
          userBenefits = JSON.parse(body.user_benefit);
          if (!Array.isArray(userBenefits)) {
            throw new Error('user_benefit must be an array');
          }
        } catch (error) {
          throw new BadRequestException('Invalid format for user_benefit');
        }
      }

      // ✅ Convert boolean fields (because they come as strings)

      if (body.user_benefit) {
        body.user_benefit = JSON.parse(body.user_benefit);
      }

      console.log('✅ Parsed DTO:', body);

      if (file) {
        body['driving_license'] = `/uploads/${file.filename}`;
      }

      return await firstValueFrom(
        this.UserServiceClient.send('create-account-monetization', {
          ...body,
          user_id: request.user?._id,
        }),
      );
    } catch (error) {
      console.error('❌ Error processing request:', error);
      throw new BadRequestException(error.message);
    }
  }

  @Get('user-account-monetization')
  async getByUser(@Req() request: any) {
    return await firstValueFrom(
      this.UserServiceClient.send(
        'user-account-monetization',
        request.user?._id,
      ),
    );
  }
}
