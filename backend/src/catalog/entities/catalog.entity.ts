import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Vertical } from './vertical.entity';
import { Local } from './local.entity';

@Entity('catalog')
export class Catalog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'vertical_id', nullable: false })
  vertical_id: number;

  @ManyToOne(() => Vertical)
  @JoinColumn({ name: 'vertical_id' })
  vertical: Vertical;

  @Column({ default: false, nullable: false })
  is_primary: boolean;

  @Column({ type: 'timestamp', nullable: false })
  indexed_at: Date;

  @ManyToMany(() => Local)
  @JoinTable({
    name: 'catalog_local',
    joinColumn: { name: 'catalog_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'local_id', referencedColumnName: 'id' },
  })
  locales: Local[];
}
