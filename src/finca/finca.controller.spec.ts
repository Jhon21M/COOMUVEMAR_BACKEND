import { Test, TestingModule } from '@nestjs/testing';
import { FincaController } from './finca.controller';
import { FincaService } from './finca.service';

describe('FincaController', () => {
  let controller: FincaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FincaController],
      providers: [FincaService],
    }).compile();

    controller = module.get<FincaController>(FincaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
