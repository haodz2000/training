import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { VaccineRegistration } from './vaccine_registration.entity';
import { Ward } from './ward.entity';

@Entity('sites')
export class Site {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'ward_id', type: 'int' })
  wardId: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'address', type: 'varchar', length: 255 })
  address: string;

  @Column({ name: 'leader', type: 'varchar', length: 50 })
  leader: string;

  @Column({ name: 'table', type: 'int' })
  table: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Ward, (ward) => ward.sites)
  @JoinColumn({ name: 'ward_id' })
  ward: Ward;

  @OneToMany(
    () => VaccineRegistration,
    (vaccineRegistration) => vaccineRegistration.site,
  )
  vaccineRegistrations: VaccineRegistration[];
}
