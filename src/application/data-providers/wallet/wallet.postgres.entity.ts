import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wallet } from '../../../core/entities/wallet';
import { UserPostgresEntity } from '../user/user.postgres.entity';

@Entity('wallets')
export class WalletPostgresEntity implements Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserPostgresEntity)
  @JoinColumn()
  user: string;

  @Column({ type: 'double precision' })
  value: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
