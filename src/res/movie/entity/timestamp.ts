import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export abstract class Timestamped {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  releasedAt: Date;
}
