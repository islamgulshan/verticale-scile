import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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

export function MultipleFileUploadInterceptor(
  fieldName: string,
  maxCount = 10,
) {
  return FilesInterceptor(fieldName, maxCount, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const timestamp = Date.now();
        const fileExt = extname(file.originalname);
        const filename = `${timestamp}-${Math.round(
          Math.random() * 1e9,
        )}${fileExt}`;
        callback(null, filename);
      },
    }),
  });
}
