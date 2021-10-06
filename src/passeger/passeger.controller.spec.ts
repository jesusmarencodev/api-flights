import { Test, TestingModule } from '@nestjs/testing';
import { PassegerController } from './passeger.controller';

describe('PassegerController', () => {
  let controller: PassegerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassegerController],
    }).compile();

    controller = module.get<PassegerController>(PassegerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
