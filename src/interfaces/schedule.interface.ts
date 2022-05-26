import { EventInterface } from './event.interface';

export interface ScheduleInterface {
  id: string;
  name: string;
  events?: EventInterface[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
