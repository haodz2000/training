import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Group } from './group.entity';
import { Site } from './site.entity';
import { User } from './user.entity';
import { Vaccine } from './vaccine.entity';

@Entity('vaccine_registrations')
export class VaccineRegistration {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({ name: 'group_id', type: 'int' })
  groupId: number;

  @Column({ name: 'site_id', type: 'int', nullable: true })
  siteId: number;

  @Column({ name: 'vaccine_id', type: 'int', nullable: true })
  vaccineId: number;

  @Column({ name: 'code', unique: true, type: 'varchar', length: 15 })
  code: string;

  @Column({ name: 'insurrance_card', type: 'varchar', length: 15 })
  insurranceCard: string;

  @Column({ name: 'job', type: 'varchar', length: 50 })
  job: string;

  @Column({ name: 'work_place', type: 'varchar', length: 255 })
  workPlace: string;

  @Column({ name: 'address', type: 'varchar', length: 255 })
  address: string;

  @Column({ name: 'shift', type: 'tinyint' })
  shift: number;

  @Column({ name: 'time', type: 'date' })
  time: Date;

  @Column({ name: 'status', type: 'tinyint' })
  status: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.vaccineRegistrations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Site, (site) => site.vaccineRegistrations)
  @JoinColumn({ name: 'site_id' })
  site: Site;

  @ManyToOne(() => Group, (group) => group.vaccineRegistrations)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ManyToOne(() => Vaccine, (vaccine) => vaccine.vaccineRegistrations)
  @JoinColumn({ name: 'vaccine_id' })
  vaccine: Vaccine;
}
