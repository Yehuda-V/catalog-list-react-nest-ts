import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogsModule } from './catalog/catalog.module';
import { connectionSource } from '../ormconfig';
  
@Module({
    imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await connectionSource.initialize();
        return connectionSource.options; 
      },
    }),
    CatalogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}