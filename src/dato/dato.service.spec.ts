import { Test, TestingModule } from '@nestjs/testing';
import { DatoService } from './dato.service';

describe('DatoService', () => {
  let service: DatoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatoService],
    }).compile();

    service = module.get<DatoService>(DatoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
