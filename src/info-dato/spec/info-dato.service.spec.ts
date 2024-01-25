import { Test, TestingModule } from '@nestjs/testing';
import { InfoDatoService } from '../info-dato.service';

describe('InfoDatoService', () => {
  let service: InfoDatoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoDatoService],
    }).compile();

    service = module.get<InfoDatoService>(InfoDatoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
