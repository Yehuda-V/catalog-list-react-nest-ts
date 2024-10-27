import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('vertical')
export class Vertical {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string;
}
