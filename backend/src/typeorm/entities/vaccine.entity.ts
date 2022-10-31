import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { VaccineRegistration } from './vaccine_registration.entity';

@Entity('vaccines')
export class Vaccine {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'code', unique: true, type: 'varchar', length: 10 })
  code: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @OneToMany(
    () => VaccineRegistration,
    (vaccineRegistration) => vaccineRegistration.vaccine,
  )
  vaccineRegistrations: VaccineRegistration[];
}
