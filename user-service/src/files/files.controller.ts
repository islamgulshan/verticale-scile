import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import {  MessagePattern, Payload } from '@nestjs/microservices';
import { FilesService } from './files.service';
@Controller('files')
export class FilesController {
    constructor(private  filesService: FilesService) { }
    @MessagePattern('create-path')
    async createPath(path: string) {
        return  await this.filesService.createPath(path);
    }
    @MessagePattern('get-access')
    async getAccessPath(path: any) {
        return  await this.filesService.getAccessPath(path);
    }
    @MessagePattern('get-folder-path')
    async getFolderPath(path: any) {
        return  await this.filesService.getFolderPath(path);
    }

    @MessagePattern('get-service-path')
    async getServicePath(path: any) {
        return  await this.filesService.getServicePath(path);
    }

    
}
