import { Test, TestingModule } from '@nestjs/testing';
import { FunctionVersionService } from './function-version.service.js';

describe('FunctionVersionService', () => {
  let service: FunctionVersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FunctionVersionService],
    }).compile();

    service = module.get<FunctionVersionService>(FunctionVersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
