import { Test, TestingModule } from '@nestjs/testing';
import { PassegerService } from './passeger.service';

describe('PassegerService', () => {
  let service: PassegerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassegerService],
    }).compile();

    service = module.get<PassegerService>(PassegerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
