import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('local')
export class Local {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, unique: true, name: 'local_code', nullable: false })
  localCode: string;
}
