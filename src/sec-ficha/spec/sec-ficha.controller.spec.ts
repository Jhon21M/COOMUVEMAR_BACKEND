import { Test, TestingModule } from '@nestjs/testing';
import { SecFichaController } from '../sec-ficha.controller';
import { SecFichaService } from '../sec-ficha.service';

describe('SecFichaController', () => {
  let controller: SecFichaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecFichaController],
      providers: [SecFichaService],
    }).compile();

    controller = module.get<SecFichaController>(SecFichaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
