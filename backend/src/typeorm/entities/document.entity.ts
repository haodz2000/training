import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'hash_name', type: 'varchar', length: 255 })
  hashName: string;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  description: string;

  @Column({ name: 'link', type: 'varchar', length: 255 })
  link: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;
}
