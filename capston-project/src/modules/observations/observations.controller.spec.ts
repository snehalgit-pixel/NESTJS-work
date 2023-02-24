import { Test, TestingModule } from '@nestjs/testing';
import { ObservationsController } from './observations.controller';
import { ObservationsService } from './observations.service';

describe('ObservationsController', () => {
  let controller: ObservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObservationsController],
      providers: [ObservationsService],
    }).compile();

    controller = module.get<ObservationsController>(ObservationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
