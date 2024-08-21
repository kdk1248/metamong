import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export abstract class Timestamped {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
