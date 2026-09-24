import { Test, TestingModule } from '@nestjs/testing';
import { MetaController } from './meta.controller.js';

describe('MetaController', () => {
  let controller: MetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetaController],
      providers: [
        { provide: 'WORKER_CONFIG', useValue: { get: () => ({ api: {} }) } },
      ],
    }).compile();

    controller = module.get<MetaController>(MetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
