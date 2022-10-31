import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { VaccineRegistration } from './vaccine_registration.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @OneToMany(
    () => VaccineRegistration,
    (vaccineRegistration) => vaccineRegistration.group,
  )
  vaccineRegistrations: VaccineRegistration[];
}
