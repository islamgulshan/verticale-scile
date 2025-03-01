import { Test, TestingModule } from '@nestjs/testing';
import { RelationsNotificationController } from './relations-notification.controller';

describe('RelationsNotificationController', () => {
  let controller: RelationsNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelationsNotificationController],
    }).compile();

    controller = module.get<RelationsNotificationController>(RelationsNotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
