import { Catalog } from "../entities/catalog.entity";

export type FilteredCatalog = {
    id: number;
    name: string;
    is_primary: boolean;
    vertical: string;
    locales: string[];
    indexed_at: Date;
  };
  
export type CatalogResponse = {
    status: string;
    statusCode: number;
    message: string;
    catalog?: Catalog | FilteredCatalog;
    catalogs?: (Catalog | FilteredCatalog)[];
  };
  