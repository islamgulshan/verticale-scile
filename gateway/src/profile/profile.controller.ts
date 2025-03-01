import { Controller, Post, UseInterceptors, UploadedFile, Param, Inject, Req, Put, Body, Get, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiConsumes, ApiOperation, ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Express } from 'express';
import * as path from 'path';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { TOKEN_NAME } from '../constants/jwt.constant';
import { CoverProfileDto, ProfileCoverEmpty, UpdateProfileDto } from './dtos/profile.dtos';

@ApiTags('profile')
@Controller('profile')
@ApiBearerAuth(TOKEN_NAME)
export class ProfileController {
  constructor(@Inject('USER_SERVICE') private readonly UserServiceClient: ClientProxy) { }
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
    return await firstValueFrom(this.UserServiceClient.send('update-profile-picture', { user_id: request.user?._id, updateProfileDto: { profile_picture: filePath } }))

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
    return await firstValueFrom(this.UserServiceClient.send('update-cover-picture', { user_id: request.user?._id, updateProfileDto: { cover_picture: filePath } }))

  }
  @Put()
  async update(@Body() updateProfileDto: UpdateProfileDto, @Req() request: any) {
    return await firstValueFrom(this.UserServiceClient.send('update-profile', { user_id: request.user?._id, updateProfileDto }))

  }

  @Post("set-profile-cover")
  async setProfileCoverPicture(@Body() updateProfileDto: CoverProfileDto, @Req() request: any) {
    return await firstValueFrom(this.UserServiceClient.send('set-cover-profile', { user_id: request.user?._id, updateProfileDto }))
  }

  @Post("remove-profile-cover")
  async removeProfileCoverPicture(@Body() updateProfileDto: CoverProfileDto, @Req() request: any) {
    return await firstValueFrom(this.UserServiceClient.send('remove-cover-profile', { user_id: request.user?._id, updateProfileDto }))
  }

  @Get("get-user-profile")
  async getByUser(@Req() request: any) {
    return await firstValueFrom(this.UserServiceClient.send('get-user-profile', request.user?._id))
  }

  @Get(":id")
  async getProfile(@Param("id") id: String) {
    return await firstValueFrom(this.UserServiceClient.send('get-profile', id))
  }

  @Delete("profile-cover-empty")
  async profileCoverEmpty(@Body() updateProfileDto: ProfileCoverEmpty, @Req() request: any) {
    return await firstValueFrom(this.UserServiceClient.send('profile-cover-empty', { user_id: request?.user._id, updateProfileDto }))
  }

  @Delete()
  async delete(@Req() request: any) {
    return await firstValueFrom(this.UserServiceClient.send('delete-profile', request.user._id))
  }

}
