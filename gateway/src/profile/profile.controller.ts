import { Controller, Post, UseInterceptors, UploadedFile, Param, Inject, Req, Put, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiConsumes, ApiOperation, ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Express } from 'express';
import * as path from 'path';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { TOKEN_NAME } from '../constants/jwt.constant';
import { UpdateProfileDto } from './dtos/profile.dtos';

@ApiTags('File Upload')
@Controller('profile')
@ApiBearerAuth(TOKEN_NAME)
export class ProfileController {
    constructor(@Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy){}
  @Post('profile-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}${path.extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @ApiOperation({ summary: 'Upload a profile picture' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadProfilePicture(@UploadedFile() file: Express.Multer.File, @Req() request: any) {
    const filePath = `/uploads/${file.filename}`;
        return await firstValueFrom(this.UserServiceClient.send('update-profile-picture' ,{user_id: request.user?._id,updateProfileDto: {profile_picture:filePath} }))
    
  }

  @Post('cover-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}${path.extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @ApiOperation({ summary: 'Upload a cover picture' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadCoverPicture(@UploadedFile() file: Express.Multer.File, @Req() request: any) {
    const filePath = `/uploads/${file.filename}`;
    return await firstValueFrom(this.UserServiceClient.send('update-cover-picture' ,{user_id: request.user?._id,updateProfileDto: {cover_picture:filePath} }))

}
@Put()
async update(@Body() updateProfileDto:UpdateProfileDto, @Req() request: any) {
    return await firstValueFrom(this.UserServiceClient.send('update-profile' ,{user_id: request.user?._id,updateProfileDto }))

}
}
