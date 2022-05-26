import { ScheduleInterface } from './schedule.interface';

export interface EventInterface {
  id: string;
  schedule: ScheduleInterface;
  description: string;
  startDate: Date;
  endDate?: Date;
  time?: Date;
  isPaid: boolean;
  isCanceled: boolean;
  isMissed: boolean;
  justification?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
