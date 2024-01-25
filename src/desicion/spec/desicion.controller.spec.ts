import { Test, TestingModule } from '@nestjs/testing';
import { DesicionController } from '../desicion.controller';
import { DesicionService } from '../desicion.service';

describe('DesicionController', () => {
  let controller: DesicionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesicionController],
      providers: [DesicionService],
    }).compile();

    controller = module.get<DesicionController>(DesicionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
