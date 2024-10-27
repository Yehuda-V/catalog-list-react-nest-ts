import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Repository } from 'typeorm';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { Catalog } from './entities/catalog.entity';
import { Local } from './entities/local.entity';
import { CatalogResponse, FilteredCatalog } from './types/types';


function createResponse(status: 'success' | 'error', statusCode: number, message: string, data?: any): CatalogResponse {
  return {
    status,
    statusCode,
    message,
    ...(data && { catalog: data }),
    ...(Array.isArray(data) && { catalogs: data }),
  };
}

function cleanCatalog(catalog: Catalog): FilteredCatalog {
  return {
       id: catalog.id,
       name: catalog.name,
       is_primary: catalog.is_primary,
       vertical: catalog.vertical.name,
       locales: catalog.locales.map((local) => local.localCode),
       indexed_at: catalog.indexed_at,
     }
 }
 
@Injectable()
export class CatalogsService {
  constructor(
    @InjectRepository(Catalog)
    private catalogRepository: Repository<Catalog>,
    @InjectRepository(Local)
    private localRepository: Repository<Local>
  ) {}

  async findAll(): Promise<CatalogResponse> {
    const catalogs_db = await this.catalogRepository.find({
      order: {
        id: 'ASC',
      },
      relations: ['vertical', 'locales'],
    });

    const catalogs = catalogs_db.map((catalog) => cleanCatalog(catalog));

    return createResponse('success', 200, 'Catalogs found successfully', catalogs);
  }

  async findOne(id: number): Promise<CatalogResponse> {
    if (!id) {
      return createResponse('error', 400, 'Id is required');
    }

    if (typeof id !== 'number') {
      return createResponse('error', 400, 'Id must be a number');
    }

    const catalog_db = await this.catalogRepository.findOne({
      where: {
        id,
      },
      relations: ['vertical', 'locales'],
    });

    if (!catalog_db) {
      return createResponse('error', 404, `Catalog with ID "${id}" not found`);
    }

    const catalog = cleanCatalog(catalog_db);

    console.log(`catalog found: ${catalog}`);

    return createResponse('success', 200, 'Catalog found successfully', catalog);``
  }

  async create(createCatalogDto: CreateCatalogDto): Promise<CatalogResponse> {

    if(createCatalogDto.name.length < 2){
      return createResponse('error', 400, 'Name must be at least 2 characters long');
    }
    const existingCatalog_db = await this.catalogRepository.findOne({
      where: { name: createCatalogDto.name },
    });

    if (existingCatalog_db) {
      return createResponse('error', 400, 'Catalog with the same name already exists');
    }

    if(createCatalogDto.is_primary === true){
      await this.catalogRepository.update({}, { is_primary: false });//set all catalogs to not primary
      createCatalogDto.is_primary = true;
    } 

    const catalog = this.catalogRepository.create({
      name: createCatalogDto.name,
      vertical_id: createCatalogDto.vertical_id,
      indexed_at: new Date(),
      is_primary: createCatalogDto.is_primary,
    } as DeepPartial<Catalog>);

    const requiredLocales = createCatalogDto.local_codes;
    if (requiredLocales && requiredLocales.length > 0) {
      const locales_db = await this.localRepository.find({
        where: { localCode: In(requiredLocales) },
      });
      catalog.locales = locales_db;
    } else {
      return createResponse('error', 400, 'Local codes are required');
    }

    const savedCatalog = await this.catalogRepository.save(catalog);

    return createResponse('success', 201, 'Catalog created successfully', savedCatalog);

  }


  async update(id: number, updateCatalogDto: UpdateCatalogDto): Promise<CatalogResponse> {

    const catalog_db = await this.catalogRepository.findOne({ where: { id } });
    if (!catalog_db) return createResponse('error', 404, `Catalog with ID "${id}" not found`);


    if(updateCatalogDto.is_primary === true){
      await this.catalogRepository.update({}, { is_primary: false });
      updateCatalogDto.is_primary = true;
    } 
    
    const catalog = Object.assign(catalog_db, updateCatalogDto);


    const locales_db = await this.localRepository.find({
      where: { localCode: In(updateCatalogDto.local_codes) },
    });

    if(locales_db.length === 0){
      return createResponse('error', 400, 'Local codes are required');
    }
    catalog.locales = locales_db;

    if(updateCatalogDto.start_indexing === true){
      catalog.indexed_at = new Date();
    }

    const updatedCatalog_db = await this.catalogRepository.save(catalog);
    
    return createResponse('success', 200, 'Catalog updated successfully', updatedCatalog_db);
  }

  async deleteOne(id: number): Promise<CatalogResponse> {
    const catalog_db = await this.catalogRepository.findOne({
      where: { id },
      relations: ['vertical', 'locales'],
    });

    if (!catalog_db) return createResponse('error', 404, `Catalog with ID "${id}" not found`);  

    console.log(`catalog to remove: ${catalog_db.name}`);
    const removedCatalog = await this.catalogRepository.remove(catalog_db);

    return createResponse('success', 200, 'Catalog deleted successfully', removedCatalog);
  }

}
