import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', name: 'first_name' })
  firstName: string;

  @Column({ type: 'text', name: 'last_name' })
  lastName: string;

  @Column({ type: 'text' })
  @Exclude()
  password: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  @Exclude()
  updatedAt: Date;
}
