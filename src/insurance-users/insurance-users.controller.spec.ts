import { Test, TestingModule } from '@nestjs/testing';
import { InsuranceUsersController } from './insurance-users.controller';
import { InsuranceUsersService } from './insurance-users.service';

describe('InsuranceUsersController', () => {
  let controller: InsuranceUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InsuranceUsersController],
      providers: [InsuranceUsersService],
    }).compile();

    controller = module.get<InsuranceUsersController>(InsuranceUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
