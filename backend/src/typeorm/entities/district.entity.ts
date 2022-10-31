import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Province } from './province.entity';
import { Ward } from './ward.entity';

@Entity('districts')
export class District {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'province_id', type: 'int' })
  provinceId?: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => Province, (province) => province.districts)
  @JoinColumn({ name: 'province_id' })
  province?: Province;

  @OneToMany(() => Ward, (ward) => ward.district)
  wards?: Ward[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;
}
