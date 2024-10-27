import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Catalog } from './catalog.entity';
import { Local } from './local.entity';

@Entity('catalog_local')
export class CatalogLocale {
  @PrimaryColumn({ name: 'catalog_id' })
  catalog_id: number;

  @PrimaryColumn({ name: 'local_id' })
  local_id: number;

  @ManyToOne(() => Catalog, (catalog) => catalog.locales)
  @JoinColumn({ name: 'catalog_id' })
  catalog: Catalog;

  @ManyToOne(() => Local, (local) => local)
  @JoinColumn({ name: 'local_id' })
  local: Local;
}
