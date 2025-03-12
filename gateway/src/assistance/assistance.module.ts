import { Module } from '@nestjs/common';
import { ReportController } from './report/report.controller';
import { ConfigService } from '../services/config/config.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { PetitionController } from './petition/petition.controller';
import { ReportMessagesController } from './report-messages/report-messages.controller';

@Module({
  controllers: [ReportController, PetitionController, ReportMessagesController],
  providers: [
    ConfigService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('userService'));
      },
      inject: [ConfigService],
    },
  ],
})
export class AssistanceModule {}
