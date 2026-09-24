import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FunctionVersion } from '../../database/entities/function-version.entity.js';
import { FunctionVersionService } from './function-version.service.js';

describe('FunctionVersionService', () => {
  let service: FunctionVersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FunctionVersionService,
        { provide: getRepositoryToken(FunctionVersion), useValue: {} },
      ],
    }).compile();

    service = module.get<FunctionVersionService>(FunctionVersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
