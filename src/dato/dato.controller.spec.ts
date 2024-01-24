import { Test, TestingModule } from '@nestjs/testing';
import { DatoController } from './dato.controller';
import { DatoService } from './dato.service';

describe('DatoController', () => {
  let controller: DatoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatoController],
      providers: [DatoService],
    }).compile();

    controller = module.get<DatoController>(DatoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
