import { Test, TestingModule } from '@nestjs/testing';
import { SecFichaService } from '../sec-ficha.service';

describe('SecFichaService', () => {
  let service: SecFichaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecFichaService],
    }).compile();

    service = module.get<SecFichaService>(SecFichaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
