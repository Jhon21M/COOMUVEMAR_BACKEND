import { Test, TestingModule } from '@nestjs/testing';
import { DesicionService } from '../desicion.service';

describe('DesicionService', () => {
  let service: DesicionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesicionService],
    }).compile();

    service = module.get<DesicionService>(DesicionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
