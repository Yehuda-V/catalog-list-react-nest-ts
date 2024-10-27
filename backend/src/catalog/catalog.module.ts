import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogsService } from './catalog.service';
import { CatalogsController } from './catalog.controller';
import { Catalog } from './entities/catalog.entity';
import { Local } from './entities/local.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Catalog, Local])],
  controllers: [CatalogsController],
  providers: [CatalogsService],
})
export class CatalogsModule {}
