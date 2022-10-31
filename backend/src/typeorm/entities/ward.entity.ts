import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { District } from './district.entity';
import { Site } from './site.entity';
import { User } from './user.entity';

@Entity('wards')
export class Ward {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'district_id', type: 'int' })
  districtId: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => District, (district) => district.wards)
  @JoinColumn({ name: 'district_id' })
  district?: District;

  @OneToMany(() => User, (user) => user.ward)
  users: User[];

  @OneToMany(() => Site, (site) => site.ward)
  sites: Site[];
}
