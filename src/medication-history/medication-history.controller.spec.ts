import { Test, TestingModule } from '@nestjs/testing';
import { MedicationHistoryController } from './medication-history.controller';
import { MedicationHistoryService } from './medication-history.service';

describe('MedicationHistoryController', () => {
  let controller: MedicationHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicationHistoryController],
      providers: [MedicationHistoryService],
    }).compile();

    controller = module.get<MedicationHistoryController>(MedicationHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
