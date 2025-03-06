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
import { DeActivateAccountDto } from './dtos';
import { firstValueFrom } from 'rxjs';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TOKEN_NAME } from '../constants/jwt.constant';
import { Express } from 'express';
import { FileUploadInterceptor } from '../interceptors/file-upload';
@ApiTags('accounts')
@ApiBearerAuth(TOKEN_NAME)
@Controller('accounts')
export class AccountsController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy,
  ) {}
  @Post('create-update-accounts')
  @UseInterceptors(FileUploadInterceptor('license'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create an account with personal details and license document',
    schema: {
      type: 'object',
      properties: {
        license: { type: 'string', format: 'binary' },
        'persnal_information.full_name': {
          type: 'string',
          example: 'John Doe',
        },
        'persnal_information.date_of_birth': {
          type: 'string',
          example: '1995-06-15',
        },
        'persnal_information.gender': { type: 'string', example: 'Male' },
        langauge: { type: 'string', example: 'English' },
        'account_verification.reasons': {
          type: 'array',
          items: { type: 'string' },
          example: ['Missing documents', 'Invalid license'],
        },
        suggested_content: { type: 'boolean', example: false },
        auto_content: { type: 'boolean', example: false },
        interust: { type: 'string', example: 'Technology, AI, Blockchain' },
        location: { type: 'string', example: 'New York, USA' },
        gender_and_age: { type: 'string', example: 'Male, 28' },
      },
    },
  })
  @ApiOperation({
    summary: 'Create a new account with license document and personal details',
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() request: any,
  ) {
    const parsedBody = {
      persnal_information: {
        ...JSON.parse(body.persnal_information || '{}'),
        full_name: body['persnal_information.full_name'],
        date_of_birth: body['persnal_information.date_of_birth'],
        gender: body['persnal_information.gender'],
      },
      langauge: body.langauge,
      account_verification: {
        ...JSON.parse(body.account_verification || '{}'),
        reasons: body['account_verification.reasons']
          ? body['account_verification.reasons']
              .split(',')
              .map((reason) => reason.trim())
          : [],
      },
      suggested_content: body.suggested_content === 'true', // Convert to boolean
      auto_content: body.auto_content === 'true', // Convert to boolean
      interust: body.interust,
      location: body.location,
      gender_and_age: body.gender_and_age,
    };

    console.log(body, parsedBody);
    // ✅ Add uploaded file URL to account_verification
    if (file) {
      parsedBody.account_verification.license = `/uploads/${file.filename}`;
    }
    return await firstValueFrom(
      this.UserServiceClient.send('create-accounts', {
        ...parsedBody,
        user_id: request.user?._id,
        //   license: fileUrl, // Store and return the file URL
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
