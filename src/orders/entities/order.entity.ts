import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderSide } from '../enums/order-side.enum';
import { User } from 'src/users/entities/user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: OrderSide })
  side: OrderSide;

  @Column({ type: 'text' })
  symbol: string;

  @Column({ type: 'numeric', precision: 10, scale: 5, name: 'open_price' })
  openPrice: number;

  @Column({ type: 'numeric', precision: 15, scale: 2 })
  volume: number;

  @Column({ type: 'integer', name: 'user_id' })
  userId: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
