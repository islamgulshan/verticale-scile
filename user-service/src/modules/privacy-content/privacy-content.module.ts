import { Module } from '@nestjs/common';
import { PrivacyContentService } from './privacy-content.service';
import { PrivacyContentController } from './privacy-content.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PrivacyContent, PrivacyContentSchema } from './privacy-content-schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PrivacyContent.name, schema: PrivacyContentSchema },
    ]),
  ],
  providers: [PrivacyContentService],
  controllers: [PrivacyContentController],
})
export class PrivacyContentModule {}
