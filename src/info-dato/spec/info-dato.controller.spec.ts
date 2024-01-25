import { Test, TestingModule } from '@nestjs/testing';
import { InfoDatoController } from './info-dato.controller';
import { InfoDatoService } from './info-dato.service';

describe('InfoDatoController', () => {
  let controller: InfoDatoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoDatoController],
      providers: [InfoDatoService],
    }).compile();

    controller = module.get<InfoDatoController>(InfoDatoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
