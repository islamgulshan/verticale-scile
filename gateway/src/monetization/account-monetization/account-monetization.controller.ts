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
import { TOKEN_NAME } from '../../constants/jwt.constant';
import { Express } from 'express';
import { FileUploadInterceptor } from '../../interceptors/file-upload';

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
      const parsedDto = {
        content_type: body.content_type,
        content_description: body.content_description,
        amount: Number(body.amount), // Ensure amount is a number
        enable_account_monetization:
          body.enable_account_monetization === 'true',
        for_under_eighteen: body.for_under_eighteen === 'true',
        not_for_under_eighteen: body.not_for_under_eighteen === 'true',
        user_benefit: userBenefits,
      };

      console.log('✅ Parsed DTO:', parsedDto);

      // ✅ Add uploaded file URL to DTO
      let fileUrl = null;
      if (file) {
        fileUrl = `/uploads/${file.filename}`;
      }

      return await firstValueFrom(
        this.UserServiceClient.send('create-account-monetization', {
          ...parsedDto,
          user_id: request.user?._id,
          driving_license: fileUrl, // Store and return the file URL
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
