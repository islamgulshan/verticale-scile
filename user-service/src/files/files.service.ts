import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class FilesService {
    async createPath(relativePath:string) {
        const absolutePath = path.join(process.cwd(), relativePath);
        console.log("create folder ",relativePath)
       return await fs.ensureDirSync(relativePath);
      }   
      async getAccessPath(relativePath:any) {
        const absolutePath = path.join(process.cwd(), relativePath);
        return await fs.access(absolutePath, fs.constants.R_OK | fs.constants.W_OK);
       }  
       async getFolderPath(relativePath:string) {
        console.log("get folder ",relativePath)
        return path.join(process.cwd(),relativePath);
       }  

       async getServicePath(relativePath:string) {
        console.log("get ippp folder ",relativePath)
        return path.join(process.cwd());
       } 


}
