import { Test, TestingModule } from '@nestjs/testing';
import { CatalogsController } from '../catalog.controller';
import { CatalogsService } from '../catalog.service';

describe('CatalogsController', () => {
  let controller: CatalogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogsController],
      providers: [CatalogsService],
    }).compile();

    controller = module.get<CatalogsController>(CatalogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
