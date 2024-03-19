import { Test, TestingModule } from '@nestjs/testing';
import { InsuranceUsersService } from './insurance-users.service';

describe('InsuranceUsersService', () => {
  let service: InsuranceUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsuranceUsersService],
    }).compile();

    service = module.get<InsuranceUsersService>(InsuranceUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
