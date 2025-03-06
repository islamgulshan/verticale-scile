import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export function FileUploadInterceptor(fieldName: string) {
  return FileInterceptor(fieldName, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const timestamp = Date.now();
        const fileExt = extname(file.originalname);
        const filename = `${timestamp}${fileExt}`;
        callback(null, filename);
      },
    }),
  });
}
