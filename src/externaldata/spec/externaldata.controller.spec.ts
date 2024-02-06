import { Test, TestingModule } from '@nestjs/testing';
import { ExternaldataController } from '../externaldata.controller';
import { ExternaldataService } from '../externaldata.service';

describe('ExternaldataController', () => {
  let controller: ExternaldataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternaldataController],
      providers: [ExternaldataService],
    }).compile();

    controller = module.get<ExternaldataController>(ExternaldataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
