import { Test, TestingModule } from '@nestjs/testing';
import { FunctionVersionService } from '../../../repositories/function-version/function-version.service.js';
import { VersionsController } from './versions.controller.js';

describe('VersionsController', () => {
  let controller: VersionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersionsController],
      providers: [{ provide: FunctionVersionService, useValue: {} }],
    }).compile();

    controller = module.get<VersionsController>(VersionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
