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

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'email', unique: true, type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'identify_card', type: 'varchar', unique: true, length: 12 })
  identifyCard: string;

  @Column({ name: 'birthday', type: 'date' })
  birthday: Date;

  @Column({ name: 'gender', type: 'tinyint' })
  gender: number;

  @Column({ name: 'ward_id', type: 'int' })
  wardId: number;

  @Column({ name: 'type', type: 'int', default: 0 })
  type: number;

  @Column({
    name: 'token_reset_password',
    type: 'text',
    nullable: true,
  })
  tokenResetPassword: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Ward, (ward) => ward.users)
  @JoinColumn({ name: 'ward_id' })
  ward: Ward;

  @OneToMany(
    () => VaccineRegistration,
    (vaccineRegistration) => vaccineRegistration.user,
  )
  vaccineRegistrations: VaccineRegistration[];
}
