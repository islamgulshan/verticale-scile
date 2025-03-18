import { Module } from '@nestjs/common';
import { SecurityStatusController } from './security-status.controller';
import { SecurityStatusService } from './security-status.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SecurityStatus, SecurityStatusSchema } from './security-status.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SecurityStatus.name, schema: SecurityStatusSchema },
    ]),
  ],
  controllers: [SecurityStatusController],
  providers: [SecurityStatusService],
  exports: [SecurityStatusService],
})
export class SecurityStatusModule {}
