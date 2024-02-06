import { Test, TestingModule } from '@nestjs/testing';
import { ExternaldataService } from '../externaldata.service';

describe('ExternaldataService', () => {
  let service: ExternaldataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternaldataService],
    }).compile();

    service = module.get<ExternaldataService>(ExternaldataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
