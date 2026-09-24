import { Test, TestingModule } from '@nestjs/testing';
import { FunctionService } from '../../repositories/function/function.service.js';
import { FunctionsController } from './functions.controller.js';

describe('FunctionsController', () => {
  let controller: FunctionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FunctionsController],
      providers: [{ provide: FunctionService, useValue: {} }],
    }).compile();

    controller = module.get<FunctionsController>(FunctionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
