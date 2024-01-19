import { Test, TestingModule } from '@nestjs/testing';
import { ProductorController } from '../productor.controller';
import { ProductorService } from '../productor.service';

describe('ProductorController', () => {
  let controller: ProductorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductorController],
      providers: [ProductorService],
    }).compile();

    controller = module.get<ProductorController>(ProductorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
