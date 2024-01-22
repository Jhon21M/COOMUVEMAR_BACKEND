import { Test, TestingModule } from '@nestjs/testing';
import { FincaService } from './finca.service';

describe('FincaService', () => {
  let service: FincaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FincaService],
    }).compile();

    service = module.get<FincaService>(FincaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
