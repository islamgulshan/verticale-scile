import { Test, TestingModule } from '@nestjs/testing';
import { AccountMonetizationController } from './account-monetization.controller';

describe('AccountMonetizationController', () => {
  let controller: AccountMonetizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountMonetizationController],
    }).compile();

    controller = module.get<AccountMonetizationController>(AccountMonetizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
