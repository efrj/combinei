import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ScheduleEntity } from '../schedule/schedule.entity';

@Entity('c_event')
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'datetime' })
  startDate: Date;

  @Column({ type: 'datetime', nullable: true })
  endDate: Date;

  @Column({ type: 'time', nullable: true })
  time: Date;

  @Column({ type: 'boolean', default: false })
  isPaid: boolean;

  @Column({ type: 'boolean', default: false })
  isCanceled: boolean;

  @Column({ type: 'boolean', default: false })
  isMissed: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  justification: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => ScheduleEntity, (schedule) => schedule.events)
  schedule: ScheduleEntity;

  @Column({ nullable: true })
  scheduleId?: string;
}
