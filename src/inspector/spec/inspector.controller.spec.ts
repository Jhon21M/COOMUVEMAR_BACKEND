import { Test, TestingModule } from '@nestjs/testing';
import { InspectorController } from '../inspector.controller';
import { InspectorService } from '../inspector.service';

describe('InspectorController', () => {
  let controller: InspectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InspectorController],
      providers: [InspectorService],
    }).compile();

    controller = module.get<InspectorController>(InspectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
