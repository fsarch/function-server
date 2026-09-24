import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FunctionEntity } from '../../database/entities/function.entity.js';
import { FunctionService } from './function.service.js';

describe('FunctionService', () => {
  let service: FunctionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FunctionService,
        { provide: getRepositoryToken(FunctionEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<FunctionService>(FunctionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
